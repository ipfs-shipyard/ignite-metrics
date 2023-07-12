export type consentTypesExceptAll = 'minimal' | 'performance' | 'ux' | 'feedback' | 'location'
export type consentTypes = 'all' | consentTypesExceptAll
export type WithOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type MetricProviderOptionalConstructorArgs = 'metricsService' | 'storageProvider'
