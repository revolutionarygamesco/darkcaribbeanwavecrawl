import initCrawlState from '../init.ts'
import setMinutes from './set.ts'

describe('setMinutes', () => {
  it('sets the minutes in a new state', async () => {
    const before = initCrawlState()
    const after = await setMinutes(42, before, true)
    expect(after.minutes).toBe(42)
    expect(after).not.toBe(before)
  })
})
