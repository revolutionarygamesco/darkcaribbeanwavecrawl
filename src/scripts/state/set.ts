import { MODULE_ID, CRAWL_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'

const setCrawlState = async (state: CrawlState): Promise<CrawlState> => {
  const adventure = getAdventure()
  if (!adventure) return state
  await adventure.setFlag(MODULE_ID, CRAWL_STATE, state)
  return state
}

export default setCrawlState
