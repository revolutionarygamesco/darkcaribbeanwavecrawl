import type CrawlState from './state.ts'
import getSavedCrawlStates from './get-saved-crawl-states.ts'
import setSavedCrawlStates from './set-saved-crawl-states.ts'

const MAX_DAYS_SAVED = 14

const saveCrawlState = async (
  latest: CrawlState,
  stack: CrawlState[] = getSavedCrawlStates(),
  skipSave: boolean = false
): Promise<CrawlState[]> => {
  const present = latest.date.minutes
  const cutoff = present - (MAX_DAYS_SAVED * 24 * 60)
  const kept = stack.filter(state => state.date.minutes >= cutoff)
  const saved = [...kept, latest]

  if (!skipSave) await setSavedCrawlStates(saved)
  return saved
}

export default saveCrawlState
