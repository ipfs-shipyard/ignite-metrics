import Countly from 'countly-sdk-nodejs';
import MetricsProvider from './MetricsProvider.js';
export default class NodeMetricsProvider extends MetricsProvider {
    constructor(args) {
        super(Object.assign(Object.assign({}, args), { metricsService: Countly }));
    }
}
//# sourceMappingURL=NodeMetrics.js.map