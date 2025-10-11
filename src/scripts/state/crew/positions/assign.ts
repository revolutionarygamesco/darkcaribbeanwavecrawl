import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import getAssigned from './get.ts'
import setAssigned from './set.ts'

const assign = async (
  position: string,
  characters: string | string[],
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const before = getAssigned(position, previous).map(actor => actor.id)
  const ids = typeof characters === 'string' ? [characters] : characters
  const after = [...new Set([...before, ...ids])]
  return await setAssigned(position, after, previous, save)
}

export default assign
