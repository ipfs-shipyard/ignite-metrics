import type {
  CountlyEvent,
  CountlyWebSdk,
  IgnoreList,
  Segments,
  metricFeatures
} from 'countly-sdk-web'
import { COUNTLY_SETUP_DEFAULTS } from './config.js'
import type { consentTypes, consentTypesExceptAll } from './typings/countly.js'

import type { CountlyNodeSdk } from 'countly-sdk-nodejs'
import { EventAccumulator } from './EventAccumulator.js'
import type { StorageProviderInterface } from './StorageProvider.js'

export interface MetricsProviderConstructorOptions<T> {
  appKey: string
  autoTrack?: boolean
  interval?: number
  max_events?: number
  metricsService: T
  queue_size?: number
  session_update?: number
  storage?: 'none' | 'localStorage' | 'sessionStorage' | 'cookie'
  storageProvider?: StorageProviderInterface | null
  url?: string
}

export default class MetricsProvider<T extends CountlyWebSdk | CountlyNodeSdk> {
  public readonly accumulate: EventAccumulator<T>
  private readonly groupedFeatures: Record<consentTypes, metricFeatures[]> = this.mapAllEvents({
    minimal: ['sessions', 'views', 'events'],
    performance: ['crashes', 'apm'],
    ux: ['scrolls', 'clicks', 'forms'],
    feedback: ['star-rating', 'feedback'],
    location: ['location']
  })

  private sessionStarted: boolean = false
  private readonly _consentGranted: Set<consentTypes> = new Set()
  private readonly metricsService: T
  private readonly storageProvider: StorageProviderInterface | null
  private initDone: boolean = false

  constructor (config: MetricsProviderConstructorOptions<T>) {
    const { appKey, ...remainderConfig } = config
    const serviceConfig = {
      ...COUNTLY_SETUP_DEFAULTS,
      ...remainderConfig,
      app_key: appKey
    }
    const { autoTrack, metricsService, storageProvider } = serviceConfig
    // eslint-disable-next-line no-console
    console.log({ config, serviceConfig })
    this.metricsService = metricsService
    this.storageProvider = storageProvider ?? null
    this.metricsService.init(serviceConfig)
    this.accumulate = new EventAccumulator(metricsService)
    this.metricsService.group_features(this.groupedFeatures)

    if (autoTrack) {
      this.setupAutoTrack()
    }

    void this.initExistingConsent()
  }

  private async initExistingConsent (): Promise<void> {
    const existingConsent = await this.getConsentStore()
    if (existingConsent.length > 0) {
      this.addConsent(existingConsent)
    }
    this.initDone = true
  }

  mapAllEvents (eventMap: Record<consentTypesExceptAll, metricFeatures[]>): Record<consentTypes, metricFeatures[]> {
    return {
      ...eventMap,
      all: Object.values(eventMap).flat()
    }
  }

  get consentGranted (): consentTypes[] {
    return [...this._consentGranted]
  }

  setupAutoTrack (): void {
    const webSdk = this.metricsService as CountlyWebSdk
    webSdk.track_clicks?.()
    webSdk.track_forms?.()
    webSdk.track_links?.()
    webSdk.track_scrolls?.()
    webSdk.track_sessions?.()
    this.metricsService.track_errors()
    this.metricsService.track_pageview()
    this.metricsService.track_view()
  }

  async addConsent (consent: consentTypes | consentTypes[]): Promise<void> {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.add(c))
    this.metricsService.add_consent(consent)
    await this.setConsentStore()
  }

  async removeConsent (consent: consentTypes | consentTypes[]): Promise<void> {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.delete(c))
    this.metricsService.remove_consent(consent, true)
    await this.setConsentStore()
  }

  private async setConsentStore (): Promise<void> {
    /**
     * Only set the consent store if
     * 1. we have a storage provider
     * 2. we're out of the initialization phase.
     */
    if (this.storageProvider != null && this.initDone) {
      await this.storageProvider.setStore(Array.from(this._consentGranted))
    }
  }

  private async getConsentStore (): Promise<consentTypes[]> {
    return await this.storageProvider?.getStore() ?? []
  }

  checkConsent (consent: consentTypes | metricFeatures): boolean {
    if (consent in this.groupedFeatures) {
      return this.groupedFeatures[consent as consentTypes].every(this.metricsService.check_consent)
    }

    return this.metricsService.check_consent(consent)
  }

  /**
   * Update consent.
   *
   * @param {string[]} consent
   */
  async updateConsent (consent: string[]): Promise<void> {
    const approvedConsent = new Set(consent)
    await Promise.all(Object.keys(this.groupedFeatures).map(async (groupName): Promise<void> => {
      if (approvedConsent.has(groupName)) {
        await this.addConsent(groupName as consentTypes)
      } else {
        await this.removeConsent(groupName as consentTypes)
      }
    }))
  }

  /**
   * Track a page view
   *
   * Leave arguments empty to have countly automatically track the events for you.
   *
   * @param page - The page name to track
   * @param ignoreList - A list of urls to ignore
   * @param viewSegments - A list of segments to add to the view event
   */
  trackView (page?: string, ignoreList?: IgnoreList, viewSegments?: Segments): void {
    this.metricsService.track_view(page, ignoreList, viewSegments)
  }

  /**
   * Track a custom event
   *
   * @param event - The event to add to the queue
   */
  trackEvent (event: CountlyEvent): void {
    this.metricsService.add_event(event)
  }

  /**
   * Track an Error
   *
   * @param error - The Error instance
   * @param nonFatal - Whether the error is fatal or not
   * @param segments - A list of segments to add to the error event
   */
  trackError (error: Error, nonFatal = true, segments: Segments = {}): void {
    this.metricsService.recordError(error, nonFatal, segments)
  }

  /**
   *
   * @param {boolean} noHeartBeat - By defaulting to false, we allow countly to calculate session lengths. Countly will send session_duration events every ~60 seconds.
   * @param {boolean} force
   */
  startSession (noHeartBeat = false, force = false): void {
    /**
     * Don't call start_session if there is already a session.
     */
    if (!this.sessionStarted) {
      this.sessionStarted = true
      this.metricsService.begin_session(noHeartBeat, force)
    }
  }

  endSession (force = false): void {
    /**
     * Don't call end_session if there is no session.
     */
    if (this.sessionStarted) {
      /**
       * Don't pass seconds to Countly, it will calculate session duration for us.
       * When ending a session, countly will set session_duration to the length of time between now and the last session_duration event.
       */
      this.metricsService.end_session(undefined, force)
      this.sessionStarted = false
    }
  }
}
