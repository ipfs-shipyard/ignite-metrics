import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'
import Countly from 'countly-sdk-web'

export class BrowserMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>) {
    super({ ...args, metricsService: Countly })
  }
}

export default BrowserMetricsProvider
