import { expect, sinon } from '../testUtils.js'
import Countly from 'countly-sdk-nodejs'
import { EventAccumulator } from '../../src/EventAccumulator.js'

const sleep = async (ms: number): Promise<unknown> => await new Promise(resolve => setTimeout(resolve, ms))
const sandbox = sinon.createSandbox()
const addEventListenerStub = sandbox.stub()
globalThis.addEventListener = addEventListenerStub

describe('EventAccumulator', () => {
  let countlyStub: sinon.SinonStubbedInstance<typeof Countly>

  beforeEach(() => {
    countlyStub = sandbox.stub(Countly)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should accumulate events', async () => {
    const accumulator = new EventAccumulator(countlyStub)
    const event = {
      key: 'test',
      count: 1,
      sum: 1,
      segmentation: {}
    }
    // add the event twice with a 100ms delay between them, this is needed to test the duration.
    accumulator.addEvent(event)
    await sleep(100)
    accumulator.addEvent(event)
    // flush the event
    accumulator.flush('test')
    // check the event data
    const { count, dur, key, sum, segmentation } = countlyStub.add_event.getCall(0).args[0]
    expect(count).to.be.equal(2)
    expect(dur).to.be.greaterThan(100)
    expect(key).to.be.equal('test')
    expect(sum).to.be.equal(2)
    expect(segmentation).to.be.deep.equal({})
    expect(countlyStub.add_event.callCount).to.be.equal(1)
  })

  it('should flush events after the flush interval', async () => {
    const accumulator = new EventAccumulator(countlyStub, 100)
    const event = {
      key: 'test',
      count: 1,
      sum: 1,
      segmentation: {}
    }
    accumulator.addEvent(event)
    // wait for the flush interval to pass
    await sleep(150)
    // check the event data
    const { count, dur, key, sum, segmentation } = countlyStub.add_event.getCall(0).args[0]
    expect(count).to.be.equal(1)
    expect(dur).to.be.greaterThanOrEqual(100)
    expect(key).to.be.equal('test')
    expect(sum).to.be.equal(1)
    expect(segmentation).to.be.deep.equal({})
    expect(countlyStub.add_event.callCount).to.be.equal(1)
  })

  it('should flush events when flush=true', async () => {
    const accumulator = new EventAccumulator(countlyStub, 1000)
    const event = {
      key: 'test',
      count: 1,
      sum: 1,
      segmentation: {}
    }
    // add the event twice with a 100ms delay between them, this is needed to test the duration.
    accumulator.addEvent(event)
    await sleep(100)
    accumulator.addEvent(event, true)
    // check the event data
    const { count, dur, key, sum, segmentation } = countlyStub.add_event.getCall(0).args[0]
    expect(count).to.be.equal(2)
    expect(dur).to.be.greaterThanOrEqual(100)
    expect(key).to.be.equal('test')
    expect(sum).to.be.equal(2)
    expect(segmentation).to.be.deep.equal({})
    expect(countlyStub.add_event.callCount).to.be.equal(1)
  })

  it('should accumulate segments', async () => {
    const accumulator = new EventAccumulator(countlyStub, 1000)
    const event1 = {
      key: 'test',
      count: 1,
      sum: 1,
      segmentation: {
        foo: 'bar'
      }
    }
    const event2 = {
      key: 'test',
      count: 1,
      sum: 1,
      segmentation: {
        bar: 'baz'
      }
    }
    // add the event twice with a 100ms delay between them, this is needed to test the duration.
    accumulator.addEvent(event1)
    await sleep(100)
    accumulator.addEvent(event2, true)
    // check the event data
    const { count, dur, key, sum, segmentation } = countlyStub.add_event.getCall(0).args[0]
    expect(count).to.be.equal(2)
    expect(dur).to.be.greaterThanOrEqual(100)
    expect(key).to.be.equal('test')
    expect(sum).to.be.equal(2)
    expect(segmentation).to.be.deep.equal({
      foo: 'bar',
      bar: 'baz'
    })
    expect(countlyStub.add_event.callCount).to.be.equal(1)
  })

  it('should accumulate different types of events', async () => {
    const accumulator = new EventAccumulator(countlyStub, 100)
    const event1 = {
      key: 'test1',
      count: 1,
      sum: 1,
      segmentation: {
        foo: 'bar'
      }
    }
    const event2 = {
      key: 'test2',
      count: 1,
      sum: 1,
      segmentation: {
        bar: 'baz'
      }
    }
    accumulator.addEvent(event1)
    // adding the second event after 50ms so that the first event is flushed first
    await sleep(50)
    accumulator.addEvent(event2)
    // wait for the flush interval to pass
    await sleep(150)
    // check the event data
    const calls = [['test1', { foo: 'bar' }], ['test2', { bar: 'baz' }]]
    calls.forEach(([testKey, segment], idx) => {
      const { count, dur, key, sum, segmentation } = countlyStub.add_event.getCall(idx).args[0]
      expect(count).to.be.equal(1)
      expect(dur).to.be.greaterThanOrEqual(100)
      expect(key).to.be.equal(testKey)
      expect(sum).to.be.equal(1)
      expect(segmentation).to.be.deep.equals(segment)
    })
    expect(countlyStub.add_event.callCount).to.be.equal(2)
  })

  it('should flush all events from the accumulator', async () => {
    const accumulator = new EventAccumulator(countlyStub, 1000)
    const event1 = {
      key: 'test1',
      count: 1,
      sum: 1,
      segmentation: {
        foo: 'bar'
      }
    }
    const event2 = {
      key: 'test2',
      count: 1,
      sum: 1,
      segmentation: {
        bar: 'baz'
      }
    }
    const event3 = {
      key: 'test1',
      count: 2,
      sum: 2,
      segmentation: {
        foo: 'baz'
      }
    }

    accumulator.addEvent(event1)
    // adding the second event after 50ms so that the first event is flushed first
    await sleep(50)
    accumulator.addEvent(event2)
    await sleep(50)
    accumulator.addEvent(event3)
    accumulator.flushAll()
    // check the event data
    const test1Results = countlyStub.add_event.getCall(0).args[0]
    expect(test1Results.count).to.be.equal(3)
    expect(test1Results.dur).to.be.greaterThanOrEqual(100)
    expect(test1Results.key).to.be.equal('test1')
    expect(test1Results.sum).to.be.equal(2)
    expect(test1Results.segmentation).to.be.deep.equals({ foo: 'baz' })

    const test2Results = countlyStub.add_event.getCall(1).args[0]
    expect(test2Results.count).to.be.equal(1)
    expect(test2Results.dur).to.be.greaterThanOrEqual(50)
    expect(test2Results.key).to.be.equal('test2')
    expect(test2Results.sum).to.be.equal(1)
    expect(test2Results.segmentation).to.be.deep.equals({ bar: 'baz' })

    expect(countlyStub.add_event.callCount).to.be.equal(2)
  })
})
