import type CrawlState from './state.ts'
import getSavedCrawlStates from './get-saved-crawl-states.ts'

const getEarliestCrawlState = async (stack?: CrawlState[]): Promise<CrawlState | null> => {
  const states = stack ?? await getSavedCrawlStates()
  const sorted = states.sort((a, b) => a.timestamp - b.timestamp)
  return sorted.length > 0 ? sorted[0] : null
}

export default getEarliestCrawlState
