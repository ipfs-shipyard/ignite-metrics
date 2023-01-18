import { COUNTLY_API_URL } from './config.js';
export default class MetricsProvider {
    constructor({ autoTrack = true, url = COUNTLY_API_URL, appKey, metricsService }) {
        this.groupedFeatures = this.mapAllEvents({
            minimal: ['sessions', 'views', 'events'],
            performance: ['crashes', 'apm'],
            ux: ['scrolls', 'clicks', 'forms'],
            feedback: ['star-rating', 'feedback'],
            location: ['location']
        });
        this.sessionStarted = false;
        this._consentGranted = new Set();
        this.metricsService = metricsService;
        this.metricsService.init({
            app_key: appKey,
            url,
            require_consent: true
        });
        this.metricsService.group_features(this.groupedFeatures);
        if (autoTrack) {
            this.setupAutoTrack();
        }
    }
    mapAllEvents(eventMap) {
        return Object.assign(Object.assign({}, eventMap), { all: Object.values(eventMap).flat() });
    }
    get consentGranted() {
        return [...this._consentGranted];
    }
    setupAutoTrack() {
        this.metricsService.track_clicks();
        this.metricsService.track_errors();
        this.metricsService.track_forms();
        this.metricsService.track_links();
        this.metricsService.track_pageview();
        this.metricsService.track_scrolls();
        this.metricsService.track_sessions();
        this.metricsService.track_view();
    }
    addConsent(consent) {
        if (!Array.isArray(consent)) {
            consent = [consent];
        }
        consent.forEach(c => this._consentGranted.add(c));
        this.metricsService.add_consent(consent);
    }
    removeConsent(consent) {
        if (!Array.isArray(consent)) {
            consent = [consent];
        }
        consent.forEach(c => this._consentGranted.delete(c));
        this.metricsService.remove_consent(consent, true);
    }
    checkConsent(consent) {
        if (consent in this.groupedFeatures) {
            return this.groupedFeatures[consent].every(this.metricsService.check_consent);
        }
        return this.metricsService.check_consent(consent);
    }
    /**
     * Update consent.
     *
     * @param {string[]} consent
     */
    updateConsent(consent) {
        const approvedConsent = new Set(consent);
        Object.keys(this.groupedFeatures).forEach((groupName) => {
            if (approvedConsent.has(groupName)) {
                this.addConsent(groupName);
            }
            else {
                this.removeConsent(groupName);
            }
        });
    }
    /**
     *
     * @param {boolean} noHeartBeat - By defaulting to false, we allow countly to calculate session lengths. Countly will send session_duration events every ~60 seconds.
     * @param {boolean} force
     */
    startSession(noHeartBeat = false, force = false) {
        /**
         * Don't call start_session if there is already a session.
         */
        if (!this.sessionStarted) {
            this.sessionStarted = true;
            this.metricsService.begin_session(noHeartBeat, force);
        }
    }
    endSession(force = false) {
        /**
         * Don't call end_session if there is no session.
         */
        if (this.sessionStarted) {
            /**
             * Don't pass seconds to Countly, it will calculate session duration for us.
             * When ending a session, countly will set session_duration to the length of time between now and the last session_duration event.
             */
            this.metricsService.end_session(undefined, force);
            this.sessionStarted = false;
        }
    }
}
//# sourceMappingURL=MetricsProvider.js.map