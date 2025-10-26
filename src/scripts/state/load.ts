import CrawlState from './state.ts'
import getShipToken from './ship/get-token.ts'

const loadCrawlState = async (
  state: CrawlState
): Promise<void> => {
  for (const id in state.silver.crew) {
    const actor = game.actors.get(id)
    if (!actor) continue
    await actor.update({ 'system.silver': state.silver.crew[id] })
  }

  const token = await getShipToken(state)
  if (token) {
    await token.update({ 'x': state.ship.position.x })
    await token.update({ 'y': state.ship.position.y })
  }
}

export default loadCrawlState
