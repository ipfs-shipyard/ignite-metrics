import Countly from 'countly-sdk-web'

interface MetricsProviderConstructorOptions {
  appKey: string
  url?: string
  autoTrack: boolean
}

export class MetricsProvider {
  private readonly groupedFeatures: Record<string, string[]> = {
    minimal: ['sessions', 'views'],
    marketing: ['attribution', 'users', 'location'],
    tracking: ['events', 'crashes', 'apm'],
    performance: ['scrolls', 'clicks', 'forms', 'star-rating', 'feedback']
  }

  private sessionStarted: boolean = false

  constructor ({ autoTrack = true, url = 'https://countly.ipfs.io', appKey }: MetricsProviderConstructorOptions) {
    this.metricsService.init({
      app_key: appKey,
      url: url,
      require_consent: true
    })

    this.metricsService.group_features({
      all: [...this.groupedFeatures.minimal, ...this.groupedFeatures.marketing, ...this.groupedFeatures.tracking, ...this.groupedFeatures.performance],
      ...this.groupedFeatures
    })
    if (autoTrack) {
      this.autoTrack()
    }
  }

  get metricsService (): typeof Countly {
    return Countly
  }

  autoTrack () {
    this.metricsService.track_clicks()
    this.metricsService.track_errors()
    this.metricsService.track_forms()
    this.metricsService.track_links()
    this.metricsService.track_pageview()
    this.metricsService.track_scrolls()
    this.metricsService.track_sessions()
    this.metricsService.track_view()
  }

  addConsent (consent: string) {
    this.metricsService.add_consent(consent)
  }

  removeConsent (consent: string) {
    this.metricsService.remove_consent(consent, true)
  }

  checkConsent (consent: string) {
    const featuresArray = this.groupedFeatures[consent]
    if (featuresArray == null) {
      return this.metricsService.check_consent(consent)
    }
    return featuresArray.every((feature) => this.metricsService.check_consent(feature))
  }

  async updateConsent (consent: string[]) {
    const groupNames = Object.keys(this.groupedFeatures)
    for (let i = 0; i < groupNames.length; i++) {
      const groupName = groupNames[i]
      // console.log('groupName: ', groupName)
      if (consent.includes(groupName)) {
        this.addConsent(groupName)
      } else {
        this.removeConsent(groupName)
      }
    }
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
