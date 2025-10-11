import initCrawlState from './init.ts'
import setCrawlState from './set.ts'

describe('setCrawlState', () => {
  it('returns state', async () => {
    const input = initCrawlState()
    const actual = await setCrawlState(input)
    expect(actual.minutes).toBe(input.minutes)
  })

  it('is immutable', async () => {
    const input = initCrawlState()
    const actual = await setCrawlState(input)
    expect(actual).not.toBe(input)
  })
})
