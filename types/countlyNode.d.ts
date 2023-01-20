declare module 'countly-sdk-nodejs' {
  export type CountlyNodeSdk = import('countly-sdk-web').CountlyWebSdk
  const Countly: CountlyNodeSdk
  export type metricFeatures = import('countly-sdk-web').metricFeatures
  export default Countly
}
