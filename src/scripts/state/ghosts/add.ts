import CrawlState, { Ghost } from '../state.ts'
import getCopy from '../get-copy.ts'
import completeGhost from './complete.ts'
import setCrawlState from '../set.ts'

const addGhost = async (
  ghosts: Partial<Ghost> | Array<Partial<Ghost>>,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  const arr: Array<Partial<Ghost>> = Array.isArray(ghosts) ? ghosts : [ghosts]
  copy.ghosts = [...copy.ghosts, ...arr.map(spirit => completeGhost(spirit))]
  return save ? await setCrawlState(copy) : copy
}

export default addGhost
