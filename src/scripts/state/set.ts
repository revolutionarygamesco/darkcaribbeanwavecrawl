import { MODULE_ID, CRAWL_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'
import updateState from './update.ts'

const setCrawlState = async (state: CrawlState): Promise<CrawlState> => {
  const adventure = await getAdventure()
  const updated = await updateState(state)
  if (!adventure) return updated
  await adventure.setFlag(MODULE_ID, CRAWL_STATE, null)
  await adventure.setFlag(MODULE_ID, CRAWL_STATE, updated)
  return updated
}

export default setCrawlState
