import initCrawlState from '../init.ts'
import setSilver from './set.ts'

describe('setSilver', () => {
  it('sets the ship silver in a new state', async () => {
    const before = initCrawlState()
    const after = await setSilver(350000, before, true)
    expect(after.silver.company).toBe(350000)
    expect(after).not.toBe(before)
  })

  it('won’t set the ship silver below 0', async () => {
    const before = initCrawlState()
    const after = await setSilver(-10, before, true)
    expect(after.silver.company).toBe(0)
    expect(after).not.toBe(before)
  })
})
