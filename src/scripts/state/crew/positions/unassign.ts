import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import getAssigned from './get.ts'
import setAssigned from './set.ts'

const unassign = async (
  position: string,
  characters: string | string[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  const before = (await getAssigned(position, previous)).map(actor => actor.id)
  const ids = typeof characters === 'string' ? [characters] : characters
  const after = before.filter(id => !ids.includes(id))

  const unassigned = await setAssigned(position, after, previous, save && position === 'crewman')
  if (position === 'crewman') return unassigned
  const newCrew = [...new Set([...unassigned.crew.positions.crewman.assigned, ...ids])]
  return await setAssigned('crewman', newCrew, unassigned, save)
}

export default unassign
