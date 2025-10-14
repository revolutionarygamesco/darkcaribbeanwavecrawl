import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getShip = async (
  state?: CrawlState
): Promise<Actor | null> => {
  const id = (state ?? await getCrawlState()).ship.actor
  if (!id) return null
  const actor = game.actors.get(id)
  return actor ?? null
}

export default getShip
