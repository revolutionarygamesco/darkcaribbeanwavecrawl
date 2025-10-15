import initCrawlState from '../init.ts'
import removeShip from './remove.ts'

describe('removeShip', () => {
  it('sets the ship to undefined in a new state', async () => {
    const before = initCrawlState()
    before.ship.actor = 'ranger'
    const after = await removeShip(before, false)
    expect(after.ship.actor).toBeUndefined()
  })
})
