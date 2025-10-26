import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import type CrawlState from './state.ts'
import getSavedCrawlStates from './get-saved-crawl-states.ts'
import setSavedCrawlStates from './set-saved-crawl-states.ts'

const MAX_DAYS_SAVED = game.settings?.get<number>(MODULE_ID, MODULE_SETTINGS.DAYS_SAVED) ?? 14
const limit = MAX_DAYS_SAVED * 24 * 60 * 60

const saveCrawlState = async (
  latest: CrawlState,
  stack?: CrawlState[],
  save: boolean = true
): Promise<CrawlState[]> => {
  const history = stack ?? await getSavedCrawlStates()
  const present = latest.timestamp
  const cutoff = present - limit
  const kept = history.filter(state => state.timestamp >= cutoff)
  const saved = [...kept, latest]
  return save ? await setSavedCrawlStates(saved) : saved
}

export default saveCrawlState
