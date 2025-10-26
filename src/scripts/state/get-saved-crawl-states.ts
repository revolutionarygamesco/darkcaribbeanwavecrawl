import { MODULE_ID, SAVE_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'
import initCrawlState from './init.ts'

const getSavedCrawlStates = async (): Promise<CrawlState[]> => {
  const adventure = await getAdventure()
  if (!adventure) return [initCrawlState()]
  const stack = adventure.getFlag(MODULE_ID, SAVE_STATE) as CrawlState[]
  return stack && stack.length > 0 ? stack : [initCrawlState()]
}

export default getSavedCrawlStates
