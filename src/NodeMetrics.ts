import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'
import Countly from 'countly-sdk-nodejs'

export class NodeMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>) {
    super({ ...args, metricsService: Countly })
  }
}

export default NodeMetricsProvider
