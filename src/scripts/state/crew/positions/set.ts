import { MODULE_ID } from '../../../settings.ts'
import CrawlState, { CrawlTeamOfficer } from '../../state.ts'
import getCrawlState from '../../get.ts'
import getShip from '../../ship/get.ts'
import getRoster from '../get.ts'
import cloneCrawlState from '../../clone.ts'
import setCrawlState from '../../set.ts'
import getOppositeSide from '../teams/opposite.ts'
import getOppositeOfficer from '../teams/officer/opposite.ts'
import initPosition from './init.ts'
import localize from '../../../utilities/localize.ts'
import notify from '../../../utilities/notify.ts'

const setAssigned = async (
  position: string,
  characters: string | string[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  let copy = await initPosition(position, previous)
  copy.crew.positions[position] = typeof characters === 'string' ? [characters] : characters

  if (game.actors) {
    const ship = await getShip(copy)
    if (!ship?.system.attributes.crew) {
      notify('error', localize(`${MODULE_ID}.notifications.ship-before-crew`))
      return cloneCrawlState(previous)
    }

    const { min, max } = ship.system.attributes.crew
    const crewSize = (await getRoster(copy)).length

    if (crewSize < min) {
      const msg = localize(`${MODULE_ID}.notifications.below-min-crew`)
        .replaceAll('SHIPNAME', ship.name)
        .replaceAll('CREWMIN', min.toString())
        .replaceAll('XMORE', (min - crewSize).toString())
      notify('warn', msg)
      await ship.update({ 'system.attributes.crew.value': crewSize })
    } else if (crewSize > max) {
      const msg = localize(`${MODULE_ID}.notifications.above-max-crew`)
        .replaceAll('SHIPNAME', ship.name)
        .replaceAll('CREWMAX', max.toString())
      notify('error', msg)
      return cloneCrawlState(previous)
    } else {
      await ship.update({ 'system.attributes.crew.value': crewSize })
    }
  }

  // You can't be free crewman if you're also anything else
  const { crew, ...assignments } = copy.crew.positions
  const assigned = Object.values(assignments)
    .flatMap(position => position)
  copy.crew.positions.crew = copy.crew.positions.crew
    .filter(id => !assigned.includes(id))

  // You can't be both quartermaster and sailing master
  const officers = ['quartermaster', 'master']
  if (officers.includes(position)) {
    copy = await initPosition('quartermaster', copy)
    copy = await initPosition('master', copy)

    const assigned = copy.crew.positions[position]
    const other = getOppositeOfficer(position as CrawlTeamOfficer)
    copy.crew.positions[other] = (copy.crew.positions[other] ?? [])
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
