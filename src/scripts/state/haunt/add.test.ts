import initCrawlState from '../init.ts'
import addHaunt from './add.ts'

describe('addHaunt', () => {
  it('adds to the haunting level in a new state', async () => {
    const actual = await addHaunt(2, initCrawlState(), false)
    expect(actual.haunt).toBe(1 + 2)
  })

  it('won’t set the haunting level below 1', async () => {
    const actual = await addHaunt(-1, initCrawlState(), false)
    expect(actual.haunt).toBe(1)
  })

  it('won’t set the haunting level above 3', async () => {
    const actual = await addHaunt(4, initCrawlState(), false)
    expect(actual.haunt).toBe(3)
  })
})
