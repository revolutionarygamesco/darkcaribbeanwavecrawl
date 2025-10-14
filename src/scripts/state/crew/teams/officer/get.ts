import CrawlState, { CrawlTeamSide, CrawlTeamOfficer } from '../../../state.ts'
import getCrawlState from '../../../get.ts'

const getOfficer = async (
  side: CrawlTeamSide,
  state?: CrawlState
): Promise<CrawlTeamOfficer> => {
  return (state ?? await getCrawlState()).crew.teams[side].officer
}

export default getOfficer
