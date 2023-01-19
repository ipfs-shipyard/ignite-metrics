import type { StorageProvider } from './types/index.js'

export const BrowserStorageProvider: StorageProvider = {
  setStore: (consentArray) => {
    try {
      const jsonString = JSON.stringify(consentArray)
      window.localStorage.setItem('@ipfs-shipyard/ignite-metrics:consent', jsonString)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
  getStore: () => {
    try {
      const jsonString = window.localStorage.getItem('@ipfs-shipyard/ignite-metrics:consent')
      if (jsonString != null) {
        return JSON.parse(jsonString)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    /**
     * Return minimal consent if there is nothing in the store.
     */
    return ['minimal']
  }
}
