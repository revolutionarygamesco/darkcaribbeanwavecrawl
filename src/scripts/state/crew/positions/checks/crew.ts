import type CrawlState from '../../../state.ts'
import getShip from '../../../ship/get.ts'
import getRosterCount from '../../roster/count.ts'

const checkCrew = async (state: CrawlState): Promise<boolean> => {
  const ship = await getShip(state)
  const max = ship?.system.attributes.crew?.max
  if (!max) return false

  const count = await getRosterCount(state)
  return count <= max
}

export default checkCrew
