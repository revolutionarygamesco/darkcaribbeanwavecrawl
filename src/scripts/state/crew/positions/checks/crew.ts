import type CrawlState from '../../../state.ts'
import getShip from '../../../ship/get.ts'
import getRosterActors from '../../roster/actors.ts'

const checkCrew = async (state: CrawlState): Promise<boolean> => {
  const ship = await getShip(state)
  const max = ship?.system.attributes.crew?.max
  if (!max) return false

  const roster = await getRosterActors(state)
  return roster.length <= max
}

export default checkCrew
