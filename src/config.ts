import type { MetricsProviderConstructorOptions } from './MetricsProvider.js'

export const COUNTLY_API_URL = 'https://countly.ipfs.tech'
export const COUNTLY_SETUP_DEFAULTS: Omit<MetricsProviderConstructorOptions, 'appKey'> = {
    url: COUNTLY_API_URL,
    autoTrack: true,
    interval: 5000,
    max_events: 1000,
    queue_size: 1000,
    session_update: 60
}
