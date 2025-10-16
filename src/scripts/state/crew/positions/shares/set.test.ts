import initCrawlState from '../../../init.ts'
import setShares from './set.ts'

describe('setShares', () => {
  it('sets the shares for a position in a new state', async () => {
    const before = initCrawlState()
    const after = await setShares('captain', 1.5, before, false)
    expect(after.crew.positions.captain.shares).toBe(1.5)
  })
})
