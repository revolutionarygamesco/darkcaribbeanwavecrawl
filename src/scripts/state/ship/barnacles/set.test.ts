import initCrawlState from '../../init.ts'
import setBarnacles from './set.ts'

describe('setBarnacles', () => {
  it('sets the minutes of barnacle growth in a new state', async () => {
    const before = initCrawlState()
    const after = await setBarnacles(42, before, true)
    expect(after.ship.barnacles).toBe(42)
    expect(after).not.toBe(before)
  })
})
