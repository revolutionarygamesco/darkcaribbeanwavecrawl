import CrawlState, { CrawlTeamSide, CrawlTeamOfficer } from '../../../state.ts'

const getOfficer = (side: CrawlTeamSide, state: CrawlState): CrawlTeamOfficer => {
  return state.crew.teams[side].officer
}

export default getOfficer
