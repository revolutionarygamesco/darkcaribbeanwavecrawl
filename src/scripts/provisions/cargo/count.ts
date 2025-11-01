import CrawlState from '../../state/state.ts'
import getCrawlState from '../../state/get.ts'
import getShip from '../../state/ship/get.ts'

const countCargoProvisionSlots = async (state?: CrawlState): Promise<number> => {
  const cs = state ?? await getCrawlState()
  const ship = await getShip(cs)
  if (!ship) return 0

  const cargo = Array.from(ship.collections.items.values())
    .filter(doc => doc.type === 'cargo' && doc.name === 'Provisions')
  return cargo.length
}

export default countCargoProvisionSlots
