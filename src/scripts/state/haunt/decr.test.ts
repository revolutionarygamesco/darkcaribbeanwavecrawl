import initCrawlState from '../init.ts'
import decrHaunt from './decr.ts'

describe('decrHaunt', () => {
  it('reduces haunting level', async () => {
    const before = initCrawlState()
    before.haunt = 3
    const after = await decrHaunt(before, false)
    expect(after.haunt).toBe(2)
  })

  it('won’t reduce haunting level below 1', async () => {
    const before = initCrawlState()
    before.haunt = 1
    const after = await decrHaunt(initCrawlState(), false)
    expect(after.haunt).toBe(1)
    expect(after).not.toBe(before)
  })
})
