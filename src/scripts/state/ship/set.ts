import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'
import getActorId from '../../utilities/actor-id.ts'

const setShip = async (
  ship: Actor | string,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.ship.actor = getActorId(ship)
  return save ? await setCrawlState(copy) : copy
}

export default setShip
