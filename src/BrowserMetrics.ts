import Countly from 'countly-sdk-web'

import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'
import { BrowserStorageProvider } from './BrowserStorageProvider.js'

export class BrowserMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>) {
    super({
      metricsService: Countly,
      storageProvider: BrowserStorageProvider,
      ...args
    })
  }
}

export default BrowserMetricsProvider
