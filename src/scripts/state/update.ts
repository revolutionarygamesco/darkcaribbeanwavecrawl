import type CrawlState from './state.ts'
import getCopy from './get-copy.ts'
import setCrawlState from './set.ts'
import { getShipPosition } from './ship/position/update.ts'
import { fetchCrewSilver } from './silver/crew/update.ts'

const updateState = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.timestamp = game.time.worldTime

  const position = await getShipPosition()
  if (position) copy.ship.position = position

  copy.silver.crew = await fetchCrewSilver(copy)

  return save ? await setCrawlState(copy) : copy
}

export default updateState
