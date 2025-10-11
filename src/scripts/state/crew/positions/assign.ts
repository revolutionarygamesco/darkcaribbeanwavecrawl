import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import getAssigned from './get.ts'
import setAssigned from './set.ts'

const assign = async (
  position: string,
  characters: string | string[],
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const before = getAssigned(position, previous).map(actor => actor.id)
  const ids = typeof characters === 'string' ? [characters] : characters
  const after = [...new Set([...before, ...ids])]
  return await setAssigned(position, after, previous, skipSave)
}

export default assign
