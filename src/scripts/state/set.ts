import { MODULE_ID, CRAWL_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'
import cloneCrawlState from './clone.ts'

const setCrawlState = async (state: CrawlState): Promise<CrawlState> => {
  const adventure = getAdventure()
  const copy = cloneCrawlState(state)
  if (!adventure) return copy
  await adventure.setFlag(MODULE_ID, CRAWL_STATE, copy)
  return copy
}

export default setCrawlState
