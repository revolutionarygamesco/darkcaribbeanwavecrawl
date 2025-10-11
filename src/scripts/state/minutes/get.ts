import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getMinutes = (state: CrawlState = getCrawlState()): number => {
  return state.minutes
}

export default getMinutes
