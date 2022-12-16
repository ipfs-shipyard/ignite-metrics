import Countly from 'countly-sdk-web'

export class MetricsProvider {
  private readonly groupNames = ['minimal', 'marketing', 'performance', 'tracking']
  // private readonly metricsService: typeof Countly
  private isInitialized = false

  constructor (private readonly appKey: string, private readonly url = 'https://countly.ipfs.io') {
    Countly.init({
      app_key: this.appKey,
      url: this.url,
      require_consent: true
    })
    // this.metricsService = Countly
  }

  // async getMetricsService (): Promise<typeof import('countly-sdk-web')> {
  //   if (this.metricsService != null) {
  //     return this.metricsService
  //   }
  //   const importService = await import('countly-sdk-web')
  //   console.log('importService: ', importService)

  //   this.metricsService = importService
  //   return this.metricsService
  // }

  init () {
    if (this.isInitialized) {
      return
    }
    // const metricsService = await this.getMetricsService()
    // this.metricsService
    console.log('done with init')

    const minimalFeatures = ['sessions', 'views']
    const marketingFeatures = ['attribution', 'users', 'location']
    const performanceFeatures = ['events', 'crashes', 'apm']
    const trackingFeatures = ['scrolls', 'clicks', 'forms', 'star-rating', 'feedback']

    Countly.group_features({
      all: [...minimalFeatures, ...marketingFeatures, ...performanceFeatures, ...trackingFeatures],
      minimal: minimalFeatures,
      marketing: marketingFeatures,
      tracking: trackingFeatures,
      performance: performanceFeatures
    })

    Countly.track_clicks()
    Countly.track_errors()
    Countly.track_forms()
    Countly.track_links()
    Countly.track_pageview()
    Countly.track_scrolls()
    Countly.track_sessions()
    Countly.track_view()

    this.isInitialized = true
  }

  addConsent (consent: string) {
    console.log('addConsent: ', consent)
    // const metricsService = await this.getMetricsService()

    console.log('metricsService: ', Countly)
    Countly.add_consent(consent)
    console.log(`Countly.check_consent(${consent}): ${Countly.check_consent(consent).toString()}`)
  }

  removeConsent (consent: string) {
    console.log('removeConsent: ', consent)
    // const metricsService = await this.getMetricsService()

    Countly.remove_consent(consent, true)
    console.log(`Countly.check_consent(${consent}): ${Countly.check_consent(consent).toString()}`)
  }

  async updateConsent (consent: string[]) {
    console.log('updateConsent consent: ', consent)
    for (let i = 0; i < this.groupNames.length; i++) {
      const groupName = this.groupNames[i]
      console.log('groupName: ', groupName)
      if (consent.includes(groupName)) {
        this.addConsent(groupName)
      } else {
        this.removeConsent(groupName)
      }
    }
  }
}

export const initCountlyMetrics = (appKey: string, url = 'https://countly.ipfs.io') => {
  // Countly.init({
  //   app_key: appKey,
  //   url: url,
  //   require_consent: true
  // })

  // const minimalFeatures = ['sessions', 'views']
  // const marketingFeatures = ['attribution', 'users', 'location']
  // const performanceFeatures = ['events', 'crashes', 'apm']
  // const trackingFeatures = ['scrolls', 'clicks', 'forms', 'star-rating', 'feedback']

  // Countly.group_features({
  //   all: [...minimalFeatures, ...marketingFeatures, ...performanceFeatures, ...trackingFeatures],
  //   minimal: minimalFeatures,
  //   marketing: marketingFeatures,
  //   tracking: trackingFeatures,
  //   performance: performanceFeatures
  // })

  // Countly.track_clicks()
  // Countly.track_errors()
  // Countly.track_forms()
  // Countly.track_links()
  // Countly.track_pageview()
  // Countly.track_scrolls()
  // Countly.track_sessions()
  // Countly.track_view()
}

export const removeConsent = (consent: string|string[]) => {
  // Countly.remove_consent(consent, true)
}
export const addConsent = (consent: string|string[]) => {
  // Countly.add_consent(consent)
}

// export const _metricsProviderRaw: typeof Countly = Countly

export const updateMetricsConsent = (consent: string[]) => {
  consent.includes('minimal') ? addConsent('minimal') : removeConsent('minimal')
  consent.includes('marketing') ? addConsent('marketing') : removeConsent('marketing')
  consent.includes('tracking') ? addConsent('tracking') : removeConsent('tracking')
  consent.includes('performance') ? addConsent('performance') : removeConsent('performance')

  // if (Array.isArray(consent)) {
  //   localStorage.setItem('ignite_metrics_consent', JSON.stringify(consent))
  // } else {
  //   localStorage.setItem('ignite_metrics_consent', JSON.stringify([consent]))
  // }
}

export const acceptMetricsConsent = () => {
  updateMetricsConsent(['all'])
}

export const declineMetricsConsent = () => {
  updateMetricsConsent(['minimal'])
}

export const getMetricsConsent = (): string | null => {
  const metricsConsent = localStorage.getItem('ignite_metrics_consent')
  return metricsConsent
}
