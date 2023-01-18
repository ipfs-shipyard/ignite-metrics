import Countly from 'countly-sdk-nodejs'

import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'

export default class NodeMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>) {
    super({ ...args, metricsService: Countly })
  }
}
