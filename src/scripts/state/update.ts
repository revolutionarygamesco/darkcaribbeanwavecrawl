import type CrawlState from './state.ts'
import getCrawlState from './get.ts'
import setCrawlState from './set.ts'
import cloneCrawlState from './clone.ts'
import { getShipPosition } from './ship/position/update.ts'
import { fetchCrewSilver } from './silver/crew/update.ts'

const updateState = async (
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.timestamp = game.time.worldTime

  const position = getShipPosition()
  if (position) copy.ship.position = position

  copy.silver.crew = fetchCrewSilver(copy)

  return save ? await setCrawlState(copy) : copy
}

export default updateState
