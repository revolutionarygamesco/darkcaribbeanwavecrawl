import { CrawlProvisionStores } from '../../state/state.ts'
import getShip from '../../state/ship/get.ts'
import calculateCargoSpaceNeeded from './calculate.ts'

const checkCargoSpace = async (
  stores: CrawlProvisionStores,
  ship?: Actor
): Promise<{ will: boolean, could: boolean }> => {
  const s = ship ?? await getShip()
  if (!s || !s.system?.attributes.cargo?.max) return { will: false, could: false }

  const needed = await calculateCargoSpaceNeeded(stores, s)
  if (needed === 0) return { will: true, could: true }
  if (needed > s.system.attributes.cargo.max) return { will: false, could: false }

  const empty = s.system.attributes.cargo.max - s.system.attributes.cargo.value
  const provisions = Array.from(s.collections.items.values())
    .filter(doc => doc.type === 'cargo' && doc.name === 'Provisions')
    .length
  return { will: empty + provisions >= needed, could: true }
}

export default checkCargoSpace
