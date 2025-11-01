import getCrawlState from '../../state/get.ts'
import { CrawlProvisionStores } from '../../state/state.ts'
import calculateFreeSpace from '../free-space.ts'

export const PROVISIONS_PER_CARGO = 250

const calculateCargoSpaceNeeded = async (
  stores?: CrawlProvisionStores,
  ship?: Actor
): Promise<number> => {
  const free = await calculateFreeSpace(ship)
  const state = stores ? await getCrawlState() : null
  const { food, water, rum } = stores ? stores : state!.provisions
  const total = food + water + rum
  const needsCargo = total - free
  return needsCargo < 0 ? 0 : Math.ceil(needsCargo / PROVISIONS_PER_CARGO)
}

export default calculateCargoSpaceNeeded
