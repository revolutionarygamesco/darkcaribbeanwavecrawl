import CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import initPosition from './init.ts'
import checkMax from './checks/max.ts'
import checkExclusivity from './checks/exclusive.ts'
import checkCrew from './checks/crew.ts'
import updateShipCrew from '../update.ts'

const setAssigned = async (
  position: string,
  characters: string | string[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState | null> => {
  const previous = state ?? await getCrawlState()
  let candidate = await initPosition(position, previous)
  candidate.crew.positions[position] = typeof characters === 'string' ? [characters] : characters

  const checks = [checkMax, checkExclusivity, checkCrew]
  for (const check of checks) {
    if (!(await check(candidate))) return null
  }

  const newState = save ? await setCrawlState(candidate) : candidate
  if (candidate) await updateShipCrew(candidate)
  return newState
}

export default setAssigned
