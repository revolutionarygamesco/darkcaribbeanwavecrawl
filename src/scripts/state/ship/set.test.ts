import initCrawlState from '../init.ts'
import setShip from './set.ts'

describe('setShip', () => {
  const id = 'ranger'

  it('sets the ship in a new state given an ID string', async () => {
    const before = initCrawlState()
    const after = await setShip(id, before, false)
    expect(after.ship.actor).toBe(id)
  })

  it('sets the ship in a new state given an Actor', async () => {
    const before = initCrawlState()
    const after = await setShip({ id } as Actor, before, false)
    expect(after.ship.actor).toBe(id)
  })
})
