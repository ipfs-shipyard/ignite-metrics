import type { StorageProviderInterface } from './StorageProvider.js'
import type { consentTypes } from '../types/index.js'

export class BrowserStorageProvider implements StorageProviderInterface {
  setStore (consentArray: consentTypes[]): void {
    try {
      const jsonString = JSON.stringify(consentArray)
      globalThis.localStorage.setItem('@ipfs-shipyard/ignite-metrics:consent', jsonString)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  getStore (): consentTypes[] {
    try {
      const jsonString = globalThis.localStorage.getItem('@ipfs-shipyard/ignite-metrics:consent')
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
