import CrawlState, { Ghost } from '../../state.ts'
import removePotentialGhost from './remove.ts'
import addGhost from '../haunting/add.ts'
import setCrawlState from '../../set.ts'

const realizePotentialGhost = async (
  ghosts: Partial<Ghost> | Array<Partial<Ghost>>,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  let copy = await removePotentialGhost(ghosts, state, false)
  copy = await addGhost(ghosts, copy, false)
  return save ? await setCrawlState(copy) : copy
}

export default realizePotentialGhost
