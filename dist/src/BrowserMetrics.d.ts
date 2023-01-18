import Countly from 'countly-sdk-web';
import MetricsProvider, { MetricsProviderConstructorOptions } from './MetricsProvider.js';
export default class BrowserMetricsProvider extends MetricsProvider<typeof Countly> {
    constructor(args: Omit<MetricsProviderConstructorOptions<typeof Countly>, 'metricsService'>);
}
//# sourceMappingURL=BrowserMetrics.d.ts.map