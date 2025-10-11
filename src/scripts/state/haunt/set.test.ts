import initCrawlState from '../init.ts'
import setHaunt from './set.ts'

describe('setHaunt', () => {
  it('sets the haunting level in a new state', async () => {
    const before = initCrawlState()
    const after = await setHaunt(2, before, false)
    expect(after.haunt).toBe(2)
    expect(after).not.toBe(before)
  })

  it('won’t set the haunting level below 1', async () => {
    const actual = await setHaunt(0, initCrawlState(), false)
    expect(actual.haunt).toBe(1)
  })

  it('won’t set the haunting level above 3', async () => {
    const actual = await setHaunt(4, initCrawlState(), false)
    expect(actual.haunt).toBe(3)
  })
})
