import initCrawlState from '../init.ts'
import setWinds from './set.ts'

describe('setWinds', () => {
  it('sets the winds in a new state', async () => {
    const before = initCrawlState()
    const after = await setWinds(3, before, true)
    expect(after.winds).toBe(3)
    expect(after).not.toBe(before)
  })

  it('won’t set the winds below 1', async () => {
    const actual = await setWinds(0, initCrawlState(), true)
    expect(actual.winds).toBe(1)
  })

  it('won’t set the winds above 4', async () => {
    const actual = await setWinds(5, initCrawlState(), true)
    expect(actual.winds).toBe(4)
  })
})
