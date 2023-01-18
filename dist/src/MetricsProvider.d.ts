import type { metricFeatures, CountlyWebSdk } from 'countly-sdk-web';
import type { CountlyNodeSdk } from 'countly-sdk-nodejs';
import type { consentTypes, consentTypesExceptAll } from './types/index.js';
export interface MetricsProviderConstructorOptions<T> {
    appKey: string;
    url?: string;
    autoTrack?: boolean;
    metricsService: T;
}
export default class MetricsProvider<T extends CountlyWebSdk | CountlyNodeSdk> {
    private readonly groupedFeatures;
    private sessionStarted;
    private readonly _consentGranted;
    private readonly metricsService;
    constructor({ autoTrack, url, appKey, metricsService }: MetricsProviderConstructorOptions<T>);
    mapAllEvents(eventMap: Record<consentTypesExceptAll, metricFeatures[]>): Record<consentTypes, metricFeatures[]>;
    get consentGranted(): consentTypes[];
    setupAutoTrack(): void;
    addConsent(consent: consentTypes | consentTypes[]): void;
    removeConsent(consent: consentTypes | consentTypes[]): void;
    checkConsent(consent: consentTypes | metricFeatures): boolean;
    /**
     * Update consent.
     *
     * @param {string[]} consent
     */
    updateConsent(consent: string[]): void;
    /**
     *
     * @param {boolean} noHeartBeat - By defaulting to false, we allow countly to calculate session lengths. Countly will send session_duration events every ~60 seconds.
     * @param {boolean} force
     */
    startSession(noHeartBeat?: boolean, force?: boolean): void;
    endSession(force?: boolean): void;
}
//# sourceMappingURL=MetricsProvider.d.ts.map