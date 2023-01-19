import Countly from 'countly-sdk-nodejs'

import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'

export class NodeMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>) {
    super({
      metricsService: Countly,
      ...args
    })
  }
}

export default NodeMetricsProvider
