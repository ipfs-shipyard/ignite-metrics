declare module 'countly-sdk-nodejs' {
  type missingNodeSdkMethods = 'track_clicks' | 'track_forms' | 'track_links' | 'track_scrolls' | 'track_sessions'
  export type CountlyNodeSdk = Omit<import('countly-sdk-web').CountlyWebSdk, missingNodeSdkMethods>
  const Countly: CountlyNodeSdk
  export type metricFeatures = import('countly-sdk-web').metricFeatures
  export default Countly
}
