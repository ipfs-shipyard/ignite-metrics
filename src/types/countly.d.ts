declare module 'countly-sdk-web' {
  interface CountlyEventData {
    key: string
    count: number
    sum: number
    segmentation: Record<string, string | number>
  }
  interface CountlyEvent {
    // name or id of the event
    key: string
    // how many times did event occur
    count?: number
    // sum to report with event (if any)
    sum?: number
    // duration to report with event (if any)
    dur?: number
    // object with segments key /values
    segmentation?: Segments
  }

  export type eventTypes = 'apm' | 'attribution' | 'clicks' | 'crashes' | 'events' | 'feedback' | 'forms'
    | 'location' | 'scrolls' | 'sessions' | 'star-rating' | 'users' | 'views'
  export type consentTypes = 'all' | 'minimal' | 'marketing' | 'tracking' | 'performance';
  type Segments = Record<string, string>
  type IgnoreList = Array<string | RegExp>
  type CountlyEventQueueItem = [string, CountlyEventData] | [eventName: string, key: string] | [eventName: string]
  interface CountlyWebSdk {
    group_features: (arg0: Record<consentTypes, eventTypes[]>) => unknown
    check_consent: (consentFeature: eventTypes) => boolean
    add_consent: (consentFeature: consentTypes | consentTypes[]) => void
    remove_consent: (consentFeature: consentTypes | consentTypes[], enforceConsentUpdate?: boolean) => void
    require_consent: boolean
    init: (configOptions?: Partial<CountlyWebSdk>) => void
    /**
     * Report custom event
     *
     */
    add_event: (event: CountlyEvent) => void
    app_key: string
    url: string
    q: CountlyEventQueueItem[]
    track_domains: boolean
    /**
     * For the track_* functions below, @see https://github.com/Countly/countly-sdk-web/blob/1c72a3b5d4c1e66031e3ecc5779adfe030ab21e0/lib/countly.js
     */

    /**
     * Automatically track javascript errors that happen on the website and report them to the server
     *
     * @param {Segments} segments - additional key value pairs you want to provide with error report, like versions of libraries used, etc.
     */
    track_errors: (segments?: Segments) => void

    /**
     * Track user sessions automatically, including  time user spent on your website
     */
    track_sessions: () => void

    /**
     * Track page views user visits
     *
     * @param {string} page - optional name of the page, by default uses current url path
     * @param {IgnoreList} ignoreList - optional array of strings or regexps to test for the url/view name to ignore and not report
     * @param {Segments} viewSegments - optional key value object with segments to report with the view
     */
    track_pageview: (page?: string, ignoreList?: IgnoreList, viewSegments?: Segments) => void

    /**
     * Track page views user visits. Alias of {@link track_pageview} method for compatibility with NodeJS SDK
     *
     * @param {string} page - optional name of the page, by default uses current url path
     * @param {IgnoreList} ignoreList - optional array of strings or regexps to test for the url/view name to ignore and not report
     * @param {Segments} segments - optional view segments to track with the view
     */
    track_view: (page?: string, ignoreList?: IgnoreList, viewSegments?: Segments) => void

    /**
     * Track all clicks on this page
     *
     * @param {HTMLElement} parent - DOM object which children to track, by default it is document body
     */
    track_clicks: () => void

    /**
     * Track all scrolls on this page
     *
     * @param {HTMLElement} parent - DOM object which children to track, by default it is document body
     */
    track_scrolls: () => void
    /**
     * Generate custom event for all links that were clicked on this page
     *
     * @param {HTMLElement} parent - DOM object which children to track, by default it is document body
     */
    track_links: () => void
    /**
     * Generate custom event for all forms that were submitted on this page
     *
     * @param {HTMLElement} parent - DOM object which children to track, by default it is document body
     * @param {boolean} trackHidden - provide true to also track hidden inputs, default false
     * */
    track_forms: () => void

    /**
     *
     * @param {boolean} noHeartBeat - true if you don't want to use internal heartbeat to manage session
     * @param {boolean} force - force begin session request even if session cookie is enabled
     * @returns {void}
     */
    begin_session: (noHeartBeat, force) => void

    /**
     *
     * @param {number} [sec] - amount of seconds to report for current session, before ending it
     * @param {boolean} [force] - force end session request even if session cookie is enabled
     * @returns {void}
     */
    end_session: (sec, force) => void
  }
  const Countly: CountlyWebSdk
  export = Countly
}
