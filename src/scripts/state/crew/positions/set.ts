import CrawlState, { CrawlTeamOfficer } from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import getOppositeSide from '../teams/opposite.ts'
import getOppositeOfficer from '../teams/officer/opposite.ts'
import initPosition from './init.ts'

const setAssigned = async (
  position: string,
  characters: string | string[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  let copy = await initPosition(position, 1, previous)
  copy.crew.positions[position].assigned = typeof characters === 'string' ? [characters] : characters

  // You can't be free crewman if you're also anything else
  const { crewman, ...assignments } = copy.crew.positions
  const assigned = Object.values(assignments)
    .flatMap(position => position.assigned)
  copy.crew.positions.crewman.assigned = copy.crew.positions.crewman.assigned
    .filter(id => !assigned.includes(id))

  // You can't be both quartermaster and sailing master
  const officers = ['quartermaster', 'sailing-master']
  if (officers.includes(position)) {
    copy = await initPosition('quartermaster', 1, copy)
    copy = await initPosition('sailing-master', 1, copy)

    const { assigned } = copy.crew.positions[position]
    const other = getOppositeOfficer(position as CrawlTeamOfficer)
    copy.crew.positions[other].assigned = (copy.crew.positions[other].assigned ?? [])
      .filter(id => !assigned.includes(id))

    const team = copy.crew.teams.starboard.officer === position ? 'starboard' : 'larboard'
    const opp = getOppositeSide(team)
    const { helm, lookout } = copy.crew.teams[opp]
    if (helm && assigned.includes(helm)) delete copy.crew.teams[opp].helm
    if (lookout && assigned.includes(lookout)) delete copy.crew.teams[opp].lookout
    copy.crew.teams[opp].members = copy.crew.teams[opp].members.filter(id => !assigned.includes(id))
    copy.crew.teams[team].members = [...new Set([...copy.crew.teams[team].members, ...assigned])]
  }

  return save ? await setCrawlState(copy) : copy
}

export default setAssigned
