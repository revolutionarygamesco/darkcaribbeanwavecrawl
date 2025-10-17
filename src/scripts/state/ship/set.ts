import type CrawlState from '../state.ts'
import setCrawlState from '../set.ts'
import getCopy from '../get-copy.ts'
import getActorId from '../../utilities/actor-id.ts'

const setShip = async (
  ship: Actor | string,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.ship.actor = getActorId(ship)
  return save ? await setCrawlState(copy) : copy
}

export default setShip
