import { MODULE_ID, SAVE_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'
import initCrawlState from './init.ts'

const getSavedCrawlStates = (): CrawlState[] => {
  const adventure = getAdventure()
  if (!adventure) return [initCrawlState()]
  return adventure.getFlag(MODULE_ID, SAVE_STATE) ?? [initCrawlState()]
}

export default getSavedCrawlStates
