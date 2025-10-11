import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getSilver = (state: CrawlState = getCrawlState()): number => {
  return state.silver.company
}

export default getSilver
