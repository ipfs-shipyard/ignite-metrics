import Countly from 'countly-sdk-web';

export const InitCountlyMetrics = (appKey, url) => {
    window.Countly = Countly;

    Countly.init({
        app_key: appKey,
        url: url,
        require_consent: true
    });

    const necessaryFeatures = ['sessions', 'views']
    const marketingFeatures = ['attribution', 'users', 'location']
    const performanceFeatures = ['events', 'crashes', 'apm']
    const trackingFeatures = ['scrolls', 'clicks', 'forms', 'star-rating', 'feedback']
  
    Countly.group_features({
      all: [...necessaryFeatures, ...marketingFeatures, ...performanceFeatures, ...trackingFeatures],
      necessary: necessaryFeatures,
      marketing: marketingFeatures,
      tracking: trackingFeatures,
      performance: performanceFeatures
    })
  
    /**
     * we can call all the helper methods we want, they won't record until consent is provided for specific features
     */
    //
    Countly.track_clicks()
    Countly.track_errors()
    Countly.track_forms()
    Countly.track_links()
    Countly.track_pageview()
    Countly.track_scrolls()
    Countly.track_sessions()
    Countly.track_view()
}

export const updateMetricsConsent = (consent: string[]) => {
  Countly.add_consent(consent)

  if (Array.isArray(consent)) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('metrics_consent', JSON.stringify(consent))
    }
  } else {
    if (typeof window !== 'undefined') {
      localStorage.setItem('metrics_consent', JSON.stringify([consent]))
    }
  }
}

export const acceptMetricsConsent = () => {
  updateMetricsConsent(['all'])
}

export const declineMetricsConsent = () => {
  updateMetricsConsent(['necessary'])
}

export const getMetricsConsent = ():string | null => {
  const metricsConsent = localStorage.getItem('metrics_consent');
  return metricsConsent
}