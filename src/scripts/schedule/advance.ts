import type CrawlState from '../state/state.ts'
import getCopy from '../state/get-copy.ts'
import getPreviousMidnight from '../time/get-previous-midnight.ts'
import schedule from './schedule.ts'
import changeWatch from './change.ts'
import setCrawlState from '../state/set.ts'

const advanceTime = async (
  before: Date,
  after: Date,
  previous?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  let state = await getCopy(previous)
  const days: Date[] = []
  let midnight = getPreviousMidnight(before)

  while (midnight.getTime() < after.getTime()) {
    days.push(midnight)
    midnight = new Date(midnight.getTime() + (24 * 60 * 60 * 1000))
  }

  const stops = [before, ...days.filter(date => date.getTime() > before.getTime()), after]
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    const year = a.getUTCFullYear()
    const month = a.getUTCMonth()
    const day = a.getUTCDate()
    const items = schedule.map(item => {
      const { hour, end } = item
      const date = new Date(Date.UTC(year, month, day, hour, 0))
      return { date, end }
    }).filter(item => item.date.getTime() >= a.getTime() && item.date.getTime() < b.getTime())

    for (const item of items) {
      state = await changeWatch(item.end, state, false)
    }
  }

  return save ? await setCrawlState(state) : state
}

export default advanceTime
