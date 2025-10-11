import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import getActorId from '../../utilities/actor-id.ts'

const setShip = async (
  ship: Actor | string,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = { ...previous }
  copy.ship.actor = getActorId(ship)
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setShip
