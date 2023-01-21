import type { consentTypes } from './types/index.js'

export interface StorageProviderInterface {
  setStore: (values: consentTypes[]) => void
  getStore: () => consentTypes[]
}

export class StorageProvider {
  constructor (options: StorageProviderInterface) {
    this.setStore = options.setStore ?? this.setStore
    this.getStore = options.getStore ?? this.setStore
  }

  setStore (values: consentTypes[]): void {
    throw new Error('Method not implemented')
  }

  getStore (): consentTypes[] {
    throw new Error('Method not implemented')
  }
}
