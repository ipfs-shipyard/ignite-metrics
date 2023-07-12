/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ensureCall, expect, sinon } from '../testUtils.js'
import CountlyNodeSdk from 'countly-sdk-nodejs'
import { NodeMetricsProvider } from '../../src/NodeMetricsProvider.js'
import type { StorageProvider } from '../../src/StorageProvider.js'
import type { consentTypes } from '../../src/typings/countly.js'

const sandbox = sinon.createSandbox()

describe('NodeMetricsProvider', function () {
  let countlyStub: sinon.SinonStubbedInstance<typeof CountlyNodeSdk>
  let storageProviderStub: sinon.SinonStubbedInstance<InstanceType<typeof StorageProvider>>
  beforeEach(function () {
    countlyStub = sandbox.stub(CountlyNodeSdk)

    storageProviderStub = sandbox.stub({ setStore: (args: consentTypes[]) => {}, getStore: (): consentTypes[] => ['minimal'] })
  })
  afterEach(function () {
    sandbox.restore()
  })

  describe('instantiation', function () {
    it('with defaults', function () {
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar' })
      expect(telemetry).to.be.an.instanceOf(NodeMetricsProvider)
      expect(telemetry).to.have.property('metricsService')
      ensureCall({ spy: countlyStub.init, callCount: 1 })
      ensureCall({ spy: countlyStub.group_features, callCount: 1 })
      expect(telemetry).to.have.property('storageProvider').that.is.null

      // countly methods are not called
      ensureCall({ spy: countlyStub.add_consent, callCount: 0 })
      ensureCall({ spy: countlyStub.remove_consent, callCount: 0 })

      // autoTrack methods are called
      ensureCall({ spy: countlyStub.track_errors, callCount: 1 })
      ensureCall({ spy: countlyStub.track_pageview, callCount: 1 })
      ensureCall({ spy: countlyStub.track_view, callCount: 1 })
    })

    it('with no autotrack', function () {
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', autoTrack: false })
      expect(telemetry).to.be.an.instanceOf(NodeMetricsProvider)
      expect(telemetry).to.have.property('metricsService')
      ensureCall({ spy: countlyStub.init, callCount: 1 })
      ensureCall({ spy: countlyStub.group_features, callCount: 1 })
      expect(telemetry).to.have.property('storageProvider').that.is.null

      // countly methods are not called
      ensureCall({ spy: countlyStub.add_consent, callCount: 0 })
      ensureCall({ spy: countlyStub.remove_consent, callCount: 0 })

      // autoTrack methods are not called
      ensureCall({ spy: countlyStub.track_errors, callCount: 0 })
      ensureCall({ spy: countlyStub.track_pageview, callCount: 0 })
      ensureCall({ spy: countlyStub.track_view, callCount: 0 })
    })
  })

  describe('StorageProvider usecases', function () {
    it('User has no consent stored', function () {
      storageProviderStub.getStore.returns([])
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // only storageProvider.getStore called when loading.
      ensureCall({ spy: countlyStub.add_consent, callCount: 0 })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 0 })
      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
    })

    it('User has single consent stored', async function () {
      const storedConsent: consentTypes[] = ['minimal']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      await telemetry.initDone
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // storageProvider methods are called when loading.
      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
      ensureCall({ spy: countlyStub.add_consent, callCount: 1, callIndex: 0, expectedArgs: storedConsent })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 1 })
    })

    it('User updates consent', async function () {
      const storedConsent: consentTypes[] = ['minimal']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      await telemetry.initDone
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
      ensureCall({ spy: countlyStub.add_consent, callCount: 1, callIndex: 0, expectedArgs: storedConsent })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 1 })
      await telemetry.addConsent('performance')
      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
      ensureCall({ spy: countlyStub.add_consent, callCount: 2, callIndex: 1, expectedArgs: ['performance'] })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 2, callIndex: 1, expectedArgs: ['minimal', 'performance'] })
    })

    it('User has multiple consents stored', async function () {
      const storedConsent: consentTypes[] = ['minimal', 'performance']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      await telemetry.initDone
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
      ensureCall({ spy: countlyStub.add_consent, callCount: 1, callIndex: 0, expectedArgs: storedConsent })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 1 })
    })

    it('User removes consent', async function () {
      const storedConsent: consentTypes[] = ['minimal']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      await telemetry.initDone
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 })
      ensureCall({ spy: countlyStub.add_consent, callCount: 1, callIndex: 0, expectedArgs: storedConsent })
      ensureCall({ spy: countlyStub.remove_consent, callCount: 0 })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 1 })
      await telemetry.removeConsent('minimal')
      ensureCall({ spy: storageProviderStub.getStore, callCount: 1 }) // no change
      ensureCall({ spy: countlyStub.remove_consent, callCount: 1, callIndex: 0, expectedArgs: ['minimal'] })
      ensureCall({ spy: storageProviderStub.setStore, callCount: 2, callIndex: 1, expectedArgs: [] })
    })
  })
})
