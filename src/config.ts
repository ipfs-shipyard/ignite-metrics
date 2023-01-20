export const COUNTLY_API_URL = 'https://countly.ipfs.tech'
export const COUNTLY_SETUP_DEFAULTS = {
  url: COUNTLY_API_URL,
  autoTrack: true,
  interval: 5000,
  max_events: 500,
  queue_size: 1000,
  session_update: 60,
  require_consent: true
}
