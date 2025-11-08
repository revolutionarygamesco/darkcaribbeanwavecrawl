import type CrawlState from '../state.ts'
import { HauntLevel } from './report.ts'
import getCrawlState from '../get.ts'
import getShip from '../ship/get.ts'
import clamp from '../../utilities/clamp.ts'

const describeHaunt = async (state?: CrawlState): Promise<HauntLevel> => {
  const cs = state ?? await getCrawlState()
  const ship = await getShip(cs)
  const cargo = ship?.system?.attributes.cargo?.max ?? 0
  const slots = cargo + 1
  const ghosts = cs.ghosts.length
  const descriptions: HauntLevel[] = ['normal', 'bloody', 'dark', 'lost']
  const min = clamp(cs.chapter - 4, 0, 2)
  const index = clamp(Math.ceil(ghosts / slots) - 1, min, 3)
  return descriptions[index]
}

export default describeHaunt
