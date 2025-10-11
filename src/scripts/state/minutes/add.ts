import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setMinutes from './set.ts'

const addMinutes = async (
  minutes: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await setMinutes(previous.minutes + minutes, previous, skipSave)
}

export default addMinutes
