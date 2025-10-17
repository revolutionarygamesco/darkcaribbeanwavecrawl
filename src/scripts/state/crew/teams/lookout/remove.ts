import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import setCrawlState from '../../../set.ts'
import getCopy from '../../../get-copy.ts'

const removeLookout = async (
  side: CrawlTeamSide,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  delete copy.crew.teams[side].lookout
  return save ? await setCrawlState(copy) : copy
}

export default removeLookout
