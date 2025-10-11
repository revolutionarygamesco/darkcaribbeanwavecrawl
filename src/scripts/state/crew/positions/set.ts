import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'

const setAssigned = async (
  position: string,
  characters: string | string[],
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.crew.positions[position] = typeof characters === 'string' ? [characters] : characters
  return skipSave ? copy : await setCrawlState(copy)
}

export default setAssigned
