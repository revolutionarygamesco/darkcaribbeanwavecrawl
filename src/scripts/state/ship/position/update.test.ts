import initCrawlState from '../../init.ts'
import { CrawlShipPosition } from '../../state.ts'
import updatePosition from './update.ts'

describe('updatePosition', () => {
  it('sets the ship’s position in a new state', async () => {
    const before = initCrawlState()
    const position: CrawlShipPosition = { x: 100, y: 200, rotation: 60 }
    const after = await updatePosition(position, before, false)
    expect(after.ship.position.x).toBe(position.x)
    expect(after.ship.position.y).toBe(position.y)
    expect(after.ship.position.rotation).toBe(position.rotation)
    expect(after).not.toBe(before)
  })
})
