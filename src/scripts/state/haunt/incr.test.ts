import initCrawlState from '../init.ts'
import incrHaunt from './incr.ts'

describe('incrHaunt', () => {
  it('increases haunting level', async () => {
    const actual = await incrHaunt(initCrawlState(), true)
    expect(actual.haunt).toBe(2)
  })

  it('won’t set haunting level above 3', async () => {
    const before = initCrawlState()
    before.haunt = 3
    const actual = await incrHaunt(before, true)
    expect(actual.haunt).toBe(3)
    expect(actual).not.toBe(before)
  })
})
