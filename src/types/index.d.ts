
export type consentTypesExceptAll = 'minimal' | 'performance' | 'ux' | 'feedback' | 'location'
export type consentTypes = 'all' | consentTypesExceptAll

export interface StorageProvider {
  setStore: (values: consentTypes[]) => void
  getStore: () => consentTypes[]
}
