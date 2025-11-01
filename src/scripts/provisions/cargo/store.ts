import { PROVISIONS_PER_CARGO } from './calculate.ts'

import CrawlState from '../../state/state.ts'
import getCrawlState from '../../state/get.ts'
import getShip from '../../state/ship/get.ts'
import calculateFreeSpace from '../free-space.ts'
import clamp from '../../utilities/clamp.ts'

const storeProvisions = async (state?: CrawlState): Promise<void> => {
  const cs = state ?? await getCrawlState()
  const ship = await getShip(cs)
  if (!ship) return

  const { food, water, rum } = cs.provisions
  const total = food + water + rum
  const free = await calculateFreeSpace(ship)
  let remainder = total - free

  // Update existing provisions cargo with new totals
  const cargo = Array.from(ship.collections.items.values())
    .filter(doc => doc.type === 'cargo' && doc.name === 'Provisions')
  for await (const item of cargo) {
    const stored = clamp(remainder, 0, PROVISIONS_PER_CARGO)
    remainder -= stored
    await item.update({ 'system.value': stored.toString() })
  }

  // Delete empty provisions cargo
  const toDelete = cargo
    .filter(item => item.system?.value === '0')
    .map(item => item.id)
  await ship.deleteEmbeddedDocuments('Item', toDelete)

  // Fill new provisions cargo
  const newCargo: Array<Partial<Document>> = []
  while (remainder > 0) {
    const stored = clamp(remainder, 0, PROVISIONS_PER_CARGO)
    remainder -= stored
    newCargo.push({
      name: 'Provisions',
      type: 'cargo',
      system: { value: stored.toString() }
    })
  }
  await ship.createEmbeddedDocuments('Item', newCargo)
}

export default storeProvisions
