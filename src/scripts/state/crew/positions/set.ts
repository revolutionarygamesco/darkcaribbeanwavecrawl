import CrawlState, { CrawlTeamOfficer } from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'
import getOppositeSide from '../teams/opposite.ts'
import getOppositeOfficer from '../teams/officer/opposite.ts'

const setAssigned = async (
  position: string,
  characters: string | string[],
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.crew.positions[position] = typeof characters === 'string' ? [characters] : characters

  const officers = ['quartermaster', 'sailing-master']
  if (officers.includes(position)) {
    const ids = copy.crew.positions[position]
    const other = getOppositeOfficer(position as CrawlTeamOfficer)
    copy.crew.positions[other] = (copy.crew.positions[other] ?? [])
      .filter(id => !ids.includes(id))

    const team = copy.crew.teams.starboard.officer === position ? 'starboard' : 'larboard'
    const opp = getOppositeSide(team)
    const { helm, lookout } = copy.crew.teams[opp]
    if (helm && ids.includes(helm)) delete copy.crew.teams[opp].helm
    if (lookout && ids.includes(lookout)) delete copy.crew.teams[opp].lookout
    copy.crew.teams[opp].members = copy.crew.teams[opp].members.filter(id => !ids.includes(id))
    copy.crew.teams[team].members = [...new Set([...copy.crew.teams[team].members, ...ids])]
  }

  return save ? await setCrawlState(copy) : copy
}

export default setAssigned
