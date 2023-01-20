import Countly from 'countly-sdk-nodejs'

import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js'
import type { MetricProviderOptionalConstructorArgs, WithOptional } from './types/index.js'

export class NodeMetricsProvider extends MetricsProvider<typeof Countly> {
  constructor (args: WithOptional<MetricsProviderConstructorOptions<typeof Countly>, MetricProviderOptionalConstructorArgs>) {
    super({
      metricsService: Countly,
      ...args
    })
  }
}

export default NodeMetricsProvider
