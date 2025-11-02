import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import getShip from '../ship/get.ts'
import getRosterIds from './roster/ids.ts'

const updateShipCrew = async (state?: CrawlState): Promise<void> => {
  const cs = state ?? await getCrawlState()
  const ship = await getShip(cs)
  if (!ship) return

  const crews = await getRosterIds(cs)
  const { captain } = cs.crew.positions
  await ship.update({
    'system.captain': captain && captain.length > 0 ? captain[0] : null,
    'system.crews': crews,
    'system.attributes.crew.value': crews.length,
  })
}

export default updateShipCrew
