import initCrawlState from '../init.ts'
import addMinutes from './add.ts'

describe('addMinutes', () => {
  it('adds minutes in a new state', async () => {
    const before = initCrawlState()
    before.minutes = 7
    const after = await addMinutes(8, before, true)
    expect(before.minutes).toBe(7)
    expect(after.minutes).toBe(7 + 8)
  })
})
