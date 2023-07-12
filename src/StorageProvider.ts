import type { consentTypes } from './typings/countly.js'

export interface StorageProviderInterface {
  setStore: (values: consentTypes[]) => void | Promise<void>
  getStore: () => consentTypes[] | Promise<consentTypes[]>
}

export class StorageProvider {
  constructor (options: StorageProviderInterface) {
    this.init(options)
  }

  private init (options: StorageProviderInterface): void {
    const { setStore, getStore } = options
    this.setStore = setStore
    this.getStore = getStore
  }

  setStore (values: consentTypes[]): void | Promise<void> {
    throw new Error('Method not implemented')
  }

  getStore (): consentTypes[] | Promise<consentTypes[]> {
    throw new Error('Method not implemented')
  }
}
