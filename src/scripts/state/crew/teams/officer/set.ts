import CrawlState, { CrawlTeamSide, CrawlTeamOfficer } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import cloneCrawlState from '../../../clone.ts'
import getOppositeOfficer from './opposite.ts'
import getOppositeSide from '../opposite.ts'
import setCrawlState from '../../../set.ts'
import removeTeamMember from '../remove.ts'

const setOfficer = async (
  side: CrawlTeamSide,
  officer: CrawlTeamOfficer,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  const otherTeam = getOppositeSide(side)
  const otherOfficer = getOppositeOfficer(officer)
  const copy = cloneCrawlState(previous)

  let thisCrew = copy.crew.teams[side].members
  let thatCrew = copy.crew.teams[otherTeam].members
  const thisOfficers = copy.crew.positions[officer].assigned
  const thatOfficers = copy.crew.positions[otherOfficer].assigned

  // Switch this team's officer and the other team's officer
  copy.crew.teams[side].officer = officer
  copy.crew.teams[otherTeam].officer = otherOfficer

  // Add each team's officers to its members
  copy.crew.teams[side].members = [...new Set([...thisCrew, ...thisOfficers])]
  copy.crew.teams[otherTeam].members = [...new Set([...thatCrew, ...thatOfficers])]

  // Remove officers from the opposing team
  removeTeamMember(side, thatOfficers, copy)
  removeTeamMember(otherTeam, thisOfficers, copy)

  return save ? await setCrawlState(copy) : copy
}

export default setOfficer
