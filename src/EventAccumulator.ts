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
   * Add an event to the accumulator
   *
   * @param {CountlyEvent} event - event to add
   * @param {boolean} flush - optionally whether to flush the event immediately
   */
  addEvent (event: CountlyEvent, flush: boolean = false): void {
    // create a new event object with defaults.
    const newEvent: CountlyEventData = { ...eventDefaults, ...event }
    const { key, count } = newEvent

    // validate event
    if (key === '') {
      throw new Error('Event key is required')
    }

    // if event is not in the store, add it.
    if (!(key in this.events)) {
      this.events[key] = {
        eventData: newEvent,
        // set start time to now. This will be updated when the event is flushed.
        startTime: Date.now(),
        // set a timeout to flush the event after the flush interval.
        timeout: setTimeout(() => {
          this.flush(key)
        }, this.flushInterval)
      }
    } else {
      // if event is in the store, update the event data.
      const { eventData } = this.events[key]
      eventData.count += count
      eventData.sum += 1
      eventData.segmentation = { ...eventData.segmentation, ...newEvent.segmentation }
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
