import initCrawlState from '../init.ts'
import decrWinds from './decr.ts'

describe('decrWinds', () => {
  it('reduces winds', async () => {
    const before = initCrawlState()
    before.winds = 3
    const after = await decrWinds(before, true)
    expect(after.winds).toBe(2)
  })

  it('won’t reduce winds below 1', async () => {
    const before = initCrawlState()
    before.winds = 1
    const after = await decrWinds(initCrawlState(), true)
    expect(after.winds).toBe(1)
    expect(after).not.toBe(before)
  })
})
