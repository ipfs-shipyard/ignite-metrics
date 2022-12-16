import Countly from 'countly-sdk-web'

export class MetricsProvider {
  private readonly groupedFeatures: Record<string, string[]> = {
    minimal: ['sessions', 'views'],
    marketing: ['attribution', 'users', 'location'],
    tracking: ['events', 'crashes', 'apm'],
    performance: ['scrolls', 'clicks', 'forms', 'star-rating', 'feedback']
  }

  constructor (private readonly appKey: string, private readonly url = 'https://countly.ipfs.io') {
    this.metricsService.init({
      app_key: this.appKey,
      url: this.url,
      require_consent: true
    })
    this.init()
    console.log('ingite-metrics provider', this)
  }

  get metricsService (): typeof Countly {
    return Countly
  }

  init () {
    this.metricsService.group_features({
      all: [...this.groupedFeatures.minimal, ...this.groupedFeatures.marketing, ...this.groupedFeatures.tracking, ...this.groupedFeatures.performance],
      ...this.groupedFeatures
    })

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
}
