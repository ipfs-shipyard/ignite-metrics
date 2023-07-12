import type { consentTypes } from './typings/countly.js'

export interface StorageProviderInterface {
  setStore: (values: consentTypes[]) => void | Promise<void>
  getStore: () => consentTypes[] | Promise<consentTypes[]>
}

export class StorageProvider {
  constructor (options: StorageProviderInterface) {
    void this.init(options)
  }

  private async init (options: StorageProviderInterface): Promise<void> {
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
