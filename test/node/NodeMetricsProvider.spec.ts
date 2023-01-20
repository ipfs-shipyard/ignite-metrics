import CountlyNodeSdk from 'countly-sdk-nodejs'

import { expect, sinon } from '../testUtils.js'
import { NodeMetricsProvider } from '../../src/NodeMetrics.js'
import type { StorageProvider } from '../../src/StorageProvider.js'
import type { consentTypes } from '../../src/types/index.js'

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
      expect(countlyStub.init).to.have.callCount(1)
      expect(countlyStub.group_features).to.have.callCount(1)
      expect(telemetry).to.have.property('storageProvider').that.is.null

      // countly methods are not called
      expect(countlyStub.add_consent).not.to.have.been.called
      expect(countlyStub.remove_consent).not.to.have.been.called

      // autoTrack methods are called
      expect(countlyStub.track_errors).to.have.callCount(1)
      expect(countlyStub.track_pageview).to.have.callCount(1)
      expect(countlyStub.track_view).to.have.callCount(1)
    })

    it('with no autotrack', function () {
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', autoTrack: false })
      expect(telemetry).to.be.an.instanceOf(NodeMetricsProvider)
      expect(telemetry).to.have.property('metricsService')
      expect(countlyStub.init).to.have.callCount(1)
      expect(countlyStub.group_features).to.have.callCount(1)
      expect(telemetry).to.have.property('storageProvider').that.is.null

      // countly methods are not called
      expect(countlyStub.add_consent).not.to.have.been.called
      expect(countlyStub.remove_consent).not.to.have.been.called

      // autoTrack methods are not called
      expect(countlyStub.track_errors).not.to.have.been.called
      expect(countlyStub.track_pageview).not.to.have.been.called
      expect(countlyStub.track_view).not.to.have.been.called
    })
  })

  describe('StorageProvider usecases', function () {
    it('User has no consent stored', function () {
      storageProviderStub.getStore.returns([])
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // storageProvider methods are not called when loading.
      expect(storageProviderStub.getStore).to.have.callCount(1)
      expect(countlyStub.add_consent).not.to.have.been.called
      expect(storageProviderStub.setStore).not.to.have.been.called
    })

    it('User has single consent stored', function () {
      storageProviderStub.getStore.returns(['minimal'])
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // storageProvider methods are called when loading.
      expect(storageProviderStub.getStore).to.have.callCount(1)
      expect(countlyStub.add_consent).to.have.been.calledWith(['minimal'])
      expect(storageProviderStub.setStore).not.to.have.been.called
    })

    it('User updates consent', function () {
      const storedConsent: consentTypes[] = ['minimal']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // storageProvider methods are not called when loading.
      expect(storageProviderStub.getStore).to.have.callCount(1)
      expect(countlyStub.add_consent).to.have.been.calledWith(storedConsent)
      expect(countlyStub.add_consent).to.have.callCount(1)
      expect(storageProviderStub.setStore).not.to.have.been.called
      telemetry.addConsent('performance')
      expect(countlyStub.add_consent).to.have.callCount(2)
      expect(countlyStub.add_consent.secondCall.args[0]).to.deep.equal(['performance'])
      expect(storageProviderStub.setStore.firstCall.args[0]).to.deep.equal(['minimal', 'performance'])
      expect(storageProviderStub.getStore).to.have.callCount(1)
      expect(storageProviderStub.setStore).to.have.callCount(1)
    })

    it('User has multiple consents stored', function () {
      const storedConsent: consentTypes[] = ['minimal', 'performance']
      storageProviderStub.getStore.returns(storedConsent)
      const telemetry = new NodeMetricsProvider({ appKey: 'foo', url: 'bar', storageProvider: storageProviderStub })
      expect(telemetry).to.have.property('storageProvider').that.is.not.null

      // storageProvider methods are not called when loading.
      expect(storageProviderStub.getStore).to.have.callCount(1)
      expect(countlyStub.add_consent).to.have.been.calledWith(storedConsent)
      expect(storageProviderStub.setStore).not.to.have.been.called
    })
  })
})
