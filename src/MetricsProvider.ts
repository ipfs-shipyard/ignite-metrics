import { COUNTLY_API_URL } from './config'
import type { consentTypes, metricFeatures } from 'countly-sdk-web'
import Countly from 'countly-sdk-web'

interface MetricsProviderConstructorOptions {
  appKey: string
  url?: string
  autoTrack?: boolean
}

export default class MetricsProvider {
  private readonly minimalFeatures: metricFeatures[] = ['sessions', 'views', 'events']
  private readonly performanceFeatures: metricFeatures[] = ['crashes', 'apm']
  private readonly uxFeatures: metricFeatures[] = ['scrolls', 'clicks', 'forms']
  private readonly feedbackFeatures: metricFeatures[] = ['star-rating', 'feedback']
  private readonly locationFeatures: metricFeatures[] = ['location']
  private readonly groupedFeatures: Record<consentTypes, metricFeatures[]> = {
    all: [
      ...this.minimalFeatures,
      ...this.locationFeatures,
      ...this.performanceFeatures,
      ...this.uxFeatures,
      ...this.feedbackFeatures
    ],
    minimal: this.minimalFeatures,
    performance: this.performanceFeatures,
    ux: this.uxFeatures,
    feedback: this.feedbackFeatures,
    location: this.locationFeatures
  }

  private sessionStarted: boolean = false
  private readonly _consentGranted: Set<consentTypes> = new Set()

  constructor ({ autoTrack = true, url = COUNTLY_API_URL, appKey }: MetricsProviderConstructorOptions) {
    this.metricsService.init({
      app_key: appKey,
      url: url,
      require_consent: true
    })

    this.metricsService.group_features(this.groupedFeatures)

    if (autoTrack) {
      this.setupAutoTrack()
    }
  }

  get metricsService (): typeof Countly {
    return Countly
  }

  get consentGranted (): consentTypes[] {
    return [...this._consentGranted]
  }

  setupAutoTrack () {
    this.metricsService.track_clicks()
    this.metricsService.track_errors()
    this.metricsService.track_forms()
    this.metricsService.track_links()
    this.metricsService.track_pageview()
    this.metricsService.track_scrolls()
    this.metricsService.track_sessions()
    this.metricsService.track_view()
  }

  addConsent (consent: consentTypes | consentTypes[]) {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.add(c))
    this.metricsService.add_consent(consent)
  }

  removeConsent (consent: consentTypes | consentTypes[]) {
    if (!Array.isArray(consent)) {
      consent = [consent]
    }
    consent.forEach(c => this._consentGranted.delete(c))
    this.metricsService.remove_consent(consent, true)
  }

  checkConsent (consent: consentTypes | metricFeatures) {
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
  updateConsent (consent: string[]) {
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
  startSession (noHeartBeat = false, force = false) {
    /**
     * Don't call start_session if there is already a session.
     */
    if (!this.sessionStarted) {
      this.sessionStarted = true
      this.metricsService.begin_session(noHeartBeat, force)
    }
  }

  endSession (force = false) {
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
