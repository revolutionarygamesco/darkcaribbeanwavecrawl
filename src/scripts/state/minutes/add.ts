import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setMinutes from './set.ts'

const addMinutes = async (
  minutes: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await setMinutes(previous.minutes + minutes, previous, save)
}

export default addMinutes
