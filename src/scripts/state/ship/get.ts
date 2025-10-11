import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getShip = (state: CrawlState = getCrawlState()): Actor | null => {
  if (!state.ship.actor) return null
  const actor = game.actors.get(state.ship.actor)
  return actor ?? null
}

export default getShip
