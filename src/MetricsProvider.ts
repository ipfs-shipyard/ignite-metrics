import { COUNTLY_SETUP_DEFAULTS } from './config.js'

import type { metricFeatures, CountlyWebSdk } from 'countly-sdk-web'
import type { CountlyNodeSdk } from 'countly-sdk-nodejs'
import type { consentTypes, consentTypesExceptAll } from './types/index.js'

export interface MetricsProviderConstructorOptions<T> {
  appKey: string
  autoTrack?: boolean
  interval?: number
  max_events?: number
  queue_size?: number
  session_update?: number
  url?: string
  metricsService: T
}

export default class MetricsProvider<T extends CountlyWebSdk & CountlyNodeSdk> {
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

  constructor (config: MetricsProviderConstructorOptions<T>) {
    const serviceConfig = {
      ...COUNTLY_SETUP_DEFAULTS,
      ...config
    }
    const { appKey, autoTrack, metricsService, url } = serviceConfig
    this.metricsService = metricsService
    this.metricsService.init({
      app_key: appKey,
      url,
      require_consent: true
    })

    this.metricsService.init(serviceConfig)
    this.metricsService.group_features(this.groupedFeatures)

    if (autoTrack) {
      this.setupAutoTrack()
    }
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
    this.metricsService.track_clicks()
    this.metricsService.track_errors()
    this.metricsService.track_forms()
    this.metricsService.track_links()
    this.metricsService.track_pageview()
    this.metricsService.track_scrolls()
    this.metricsService.track_sessions()
    this.metricsService.track_view()
  }

  addConsent (consent: consentTypes | consentTypes[]): void {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.add(c))
    this.metricsService.add_consent(consent)
  }

  removeConsent (consent: consentTypes | consentTypes[]): void {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.delete(c))
    this.metricsService.remove_consent(consent, true)
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
  updateConsent (consent: string[]): void {
    const approvedConsent = new Set(consent)
    Object.keys(this.groupedFeatures).forEach((groupName) => {
      if (approvedConsent.has(groupName)) {
        this.addConsent(groupName as consentTypes)
      } else {
        this.removeConsent(groupName as consentTypes)
      }
    })
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
