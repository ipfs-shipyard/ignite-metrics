import type { CountlyWebSdk, IEventAccumulator, CountlyEvent, CountlyEventData } from 'countly-sdk-web'

const eventDefaults: CountlyEventData = {
  key: '',
  count: 1,
  sum: 1,
  dur: Date.now(),
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
  private readonly events: Record<string, eventStore>
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
    this.events = {}
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
   * Check if we're already accumulating an event by key.
   *
   * @param {string} key - event key
   * @returns {boolean} - whether the event accumulator exists
   */
  private accumulatorExists (key: string): boolean {
    return key in this.events
  }

  /**
   * Setup the event accumulator for a key type for the first time.
   *
   * @param {CountlyEventData} eventData - event data
   */
  private setupEventAccumulator (eventData: CountlyEventData): void {
    const { key } = eventData
    this.events[key] = {
      eventData,
      // set start time to now. This will be updated when the event is flushed.
      startTime: Date.now(),
      // set a timeout to flush the event after the flush interval.
      timeout: setTimeout(() => {
        this.flush(key)
      }, this.flushInterval)
    }
  }

  /**
   * Digest only the event data from an event.
   *
   * @param {CountlyEventData} newEventData - event data
   */
  private digestEventData (newEventData: CountlyEventData): void {
    const { key, count, segmentation } = newEventData
    // if event is in the store, update the event data.
    const { eventData } = this.events[key]
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

    // if event is not in the store, add it.
    if (!this.accumulatorExists(key)) {
      this.setupEventAccumulator(eventData)
    } else {
      this.digestEventData(eventData)
    }

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
    // if event is not in the store, return.
    if (!(key in this.events)) {
      return
    }

    const { eventData, startTime, timeout } = this.events[key]

    // update duration to ms from start.
    eventData.dur = Date.now() - startTime
    // add event to the async queue.
    this.metricsService.add_event(eventData)
    clearTimeout(timeout)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.events[key]
  }
}
