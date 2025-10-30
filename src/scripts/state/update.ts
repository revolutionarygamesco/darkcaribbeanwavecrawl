import type CrawlState from './state.ts'
import getCopy from './get-copy.ts'
import { getShipPosition } from './ship/position/update.ts'
import { fetchCrewSilver } from './silver/crew/update.ts'

const updateState = async (state?: CrawlState): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.timestamp = game?.time?.worldTime ?? -8029350000000

  const position = await getShipPosition()
  if (position) copy.ship.position = position

  copy.silver.crew = await fetchCrewSilver(copy)

  return copy
}

export default updateState
