import initCrawlState from '../../init.ts'
import addBarnacles from './add.ts'

describe('addBarnacles', () => {
  it('adds minutes of barnacle growth in a new state', async () => {
    const before = initCrawlState()
    before.ship.barnacles = 100
    const after = await addBarnacles(100, before, false)
    expect(before.ship.barnacles).toBe(100)
    expect(after.ship.barnacles).toBe(200)
  })
})
