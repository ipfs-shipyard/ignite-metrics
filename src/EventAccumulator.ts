import type { CountlyEvent, CountlyEventData, CountlyWebSdk, IEventAccumulator } from 'countly-sdk-web'

const eventDefaults: CountlyEventData = {
  key: '',
  count: 1,
  sum: 1,
  dur: 0,
  segmentation: {}
}

interface eventStore {
  eventData: CountlyEventData
  startTime: number
  timeout: NodeJS.Timeout
}

/**
 * EventAccumulator is a class that accumulates events and flushes them to the Countly server.
 */
export class EventAccumulator implements IEventAccumulator {
  private readonly metricsService: CountlyWebSdk
  private readonly events: Map<string, eventStore>
  private readonly flushInterval: number

  /**
   * Create a new EventAccumulator
   *
   * @param {CountlyWebSdk} metricsService - instance
   * @param {number} flushInterval - in milliseconds
   */
  constructor (metricsService: CountlyWebSdk, flushInterval: number = 5 * 60 * 1000) {
    this.metricsService = metricsService
    this.flushInterval = flushInterval
    this.events = new Map()
  }

  /**
   * Pad events with default values
   *
   * @param {CountlyEvent} event - event to add defaults to
   * @returns {CountlyEventData} - event with defaults added
   */
  private addEventDefaults (event: CountlyEvent): CountlyEventData {
    return { ...eventDefaults, ...event }
  }

  /**
   * Setup the event accumulator for a key type for the first time.
   *
   * @param {CountlyEventData} eventData - event data
   */
  private setupEventAccumulator (eventData: CountlyEventData): void {
    const { key } = eventData
    this.events.set(key, {
      eventData,
      // set start time to now. This will be updated when the event is flushed.
      startTime: Date.now(),
      // set a timeout to flush the event after the flush interval.
      timeout: setTimeout(() => {
        this.flush(key)
      }, this.flushInterval)
    })
  }

  /**
   * Digest only the event data from an event.
   *
   * @param {CountlyEventData} newEventData - event data
   */
  private digestEventData (newEventData: CountlyEventData): void {
    const { key, count, segmentation } = newEventData
    // if event is in the store, update the event data.
    const eventStore = this.events.get(key)
    if (eventStore == null) {
      this.setupEventAccumulator(newEventData)
      return
    }
    const { eventData } = eventStore
    eventData.count += count
    eventData.sum += 1
    eventData.segmentation = { ...eventData.segmentation, ...segmentation }
  }

  /**
   * Add an event to the accumulator
   *
   * @param {CountlyEvent} event - event to add
   * @param {boolean} flush - optionally whether to flush the event immediately
   */
  addEvent (event: CountlyEvent, flush: boolean = false): void {
    const eventData = this.addEventDefaults(event)
    const { key } = eventData

    // validate event
    if (key === '') {
      throw new Error('Event key is required.')
    }

    this.digestEventData(eventData)

    // flush the event if flush is true.
    if (flush) {
      this.flush(key)
    }
  }

  /**
   * Flush an event from the accumulator
   *
   * @param {string} key - event key
   */
  flush (key: string): void {
    const eventStore = this.events.get(key)
    if (eventStore == null) {
      return
    }

    const { eventData, startTime, timeout } = eventStore

    // update duration to ms from start.
    eventData.dur = Date.now() - startTime
    // add event to the async queue.
    this.metricsService.add_event(eventData)
    clearTimeout(timeout)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    this.events.delete(key)
  }

  /**
   * Flush all events from the accumulator
   */
  flushAll (): void {
    this.events.forEach((_, key) => {
      this.flush(key)
    })
  }
}
