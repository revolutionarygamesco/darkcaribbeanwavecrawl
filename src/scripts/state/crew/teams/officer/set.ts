import CrawlState, { CrawlTeamSide, CrawlTeamOfficer } from '../../../state.ts'
import cloneCrawlState from '../../../clone.ts'
import getOppositeOfficer from './opposite.ts'
import getOppositeSide from '../opposite.ts'
import setCrawlState from '../../../set.ts'

const setOfficer = async (
  side: CrawlTeamSide,
  officer: CrawlTeamOfficer,
  previous: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const otherTeam = getOppositeSide(side)
  const otherOfficer = getOppositeOfficer(officer)
  const copy = cloneCrawlState(previous)

  copy.crew.teams[side].officer = officer
  copy.crew.teams[otherTeam].officer = otherOfficer

  let thisCrew = copy.crew.teams[side].members
  let thatCrew = copy.crew.teams[otherTeam].members

  thisCrew = [...new Set([...thisCrew, ...(copy.crew.positions[officer]?.assigned ?? [])])]
  thatCrew = [...new Set([...thatCrew, ...(copy.crew.positions[otherOfficer]?.assigned ?? [])])]
  thatCrew = thatCrew.filter(id => !thisCrew.includes(id))
  thisCrew = thisCrew.filter(id => !thatCrew.includes(id))

  const { helm: thisHelm, lookout: thisLookout } = copy.crew.teams[side]
  const { helm: thatHelm, lookout: thatLookout } = copy.crew.teams[otherTeam]
  if (thisHelm && !thisCrew.includes(thisHelm)) delete copy.crew.teams[side].helm
  if (thisLookout && !thisCrew.includes(thisLookout)) delete copy.crew.teams[side].lookout
  if (thatHelm && !thatCrew.includes(thatHelm)) delete copy.crew.teams[otherTeam].helm
  if (thatLookout && !thatCrew.includes(thatLookout)) delete copy.crew.teams[otherTeam].lookout

  copy.crew.teams[side].members = thisCrew
  copy.crew.teams[otherTeam].members = thatCrew
  return save ? await setCrawlState(copy) : copy
}

export default setOfficer
