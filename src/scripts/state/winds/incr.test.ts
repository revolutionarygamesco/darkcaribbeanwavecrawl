import initCrawlState from '../init.ts'
import incrWinds from './incr.ts'

describe('incrWinds', () => {
  it('increases winds', async () => {
    const actual = await incrWinds(initCrawlState(), true)
    expect(actual.winds).toBe(3)
  })

  it('won’t set winds above 4', async () => {
    const before = initCrawlState()
    before.winds = 4
    const actual = await incrWinds(before, true)
    expect(actual.winds).toBe(4)
    expect(actual).not.toBe(before)
  })
})
