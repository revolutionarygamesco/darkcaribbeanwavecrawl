import initCrawlState from '../init.ts'
import addWinds from './add.ts'

describe('addWinds', () => {
  it('adds to the winds in a new state', async () => {
    const before = initCrawlState()
    before.winds = 1
    const after = await addWinds(2, before, false)
    expect(before.winds).toBe(1)
    expect(after.winds).toBe(1 + 2)
  })

  it('won’t set winds below 1', async () => {
    const actual = await addWinds(-1, initCrawlState(), false)
    expect(actual.winds).toBe(1)
  })

  it('won’t set winds above 4', async () => {
    const actual = await addWinds(8, initCrawlState(), false)
    expect(actual.winds).toBe(4)
  })
})
