import Countly from 'countly-sdk-web'
import { BrowserStorageProvider } from './BrowserStorageProvider.js'
import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'
import type { MetricProviderOptionalConstructorArgs, WithOptional } from './typings/countly.js'

export class BrowserMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: WithOptional<MetricsProviderConstructorOptions<typeof Countly>, MetricProviderOptionalConstructorArgs>) {
    super({
      metricsService: Countly,
      storageProvider: new BrowserStorageProvider(),
      ...args
    })
  }
}

export default BrowserMetricsProvider
