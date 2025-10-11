import { MODULE_ID, SAVE_STATE } from '../settings.ts'
import type CrawlState from './state.ts'
import getAdventure from './get-adventure.ts'

const setSavedCrawlStates = async (states: CrawlState[]): Promise<CrawlState[]> => {
  const copy = [...states]
  const adventure = getAdventure()
  if (!adventure) return copy
  await adventure.setFlag(MODULE_ID, SAVE_STATE, copy)
  return copy
}

export default setSavedCrawlStates
