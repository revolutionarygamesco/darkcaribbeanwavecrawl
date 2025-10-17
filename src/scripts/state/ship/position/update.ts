import CrawlState, { CrawlShipPosition } from '../../state.ts'
import getCopy from '../../get-copy.ts'
import setCrawlState from '../../set.ts'
import getShipToken from '../get-token.ts'

export const getShipPosition = async (
  state?: CrawlState
): Promise<CrawlShipPosition | null> => {
  const token = await getShipToken(state)
  if (!token) return null
  return { x: token.x, y: token.y, rotation: token.rotation }
}

const updatePosition = async (
  position?: CrawlShipPosition,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  if (!position) return copy
  copy.ship.position = position
  return save ? await setCrawlState(copy) : copy
}

export default updatePosition
