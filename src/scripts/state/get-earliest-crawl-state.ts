import type CrawlState from './state.ts'
import getSavedCrawlStates from './get-saved-crawl-states.ts'

const getEarliestCrawlState = async (stack?: CrawlState[]): Promise<CrawlState> => {
  const states = stack ?? await getSavedCrawlStates()
  const sorted = states.sort((a, b) => a.timestamp - b.timestamp)
  return sorted[0]
}

export default getEarliestCrawlState
