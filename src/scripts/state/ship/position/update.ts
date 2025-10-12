import CrawlState, { CrawlShipPosition } from '../../state.ts'
import getCrawlState from '../../get.ts'
import cloneCrawlState from '../../clone.ts'
import setCrawlState from '../../set.ts'
import getShipToken from '../get-token.ts'

export const getShipPosition = (state: CrawlState = getCrawlState()): CrawlShipPosition | null => {
  const token = getShipToken(state)
  if (!token) return null
  return { x: token.x, y: token.y, rotation: token.rotation }
}

const updatePosition = async (
  position: CrawlShipPosition | null = getShipPosition(),
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  if (!position) return previous
  const copy = cloneCrawlState(previous)
  copy.ship.position = position
  return save ? await setCrawlState(copy) : copy
}

export default updatePosition
