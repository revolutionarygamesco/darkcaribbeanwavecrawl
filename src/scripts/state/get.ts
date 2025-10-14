import { MODULE_ID, CRAWL_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'
import initCrawlState from './init.ts'

const getCrawlState = async (): Promise<CrawlState> => {
  const adventure = await getAdventure()
  if (!adventure) return initCrawlState()
  return adventure.getFlag(MODULE_ID, CRAWL_STATE) ?? initCrawlState()
}

export default getCrawlState
