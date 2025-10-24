import type CrawlState from '../../../state.ts'
import getShip from '../../../ship/get.ts'
import getRoster from '../../get.ts'

const checkCrew = async (state: CrawlState): Promise<boolean> => {
  const ship = await getShip(state)
  const max = ship?.system.attributes.crew?.max
  if (!max) return false

  const roster = await getRoster(state)
  return roster.length <= max
}

export default checkCrew
