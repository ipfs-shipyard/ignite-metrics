import Countly from 'countly-sdk-web';
import MetricsProvider from './MetricsProvider.js';
export default class BrowserMetricsProvider extends MetricsProvider {
    constructor(args) {
        super(Object.assign(Object.assign({}, args), { metricsService: Countly }));
    }
}
//# sourceMappingURL=BrowserMetrics.js.map