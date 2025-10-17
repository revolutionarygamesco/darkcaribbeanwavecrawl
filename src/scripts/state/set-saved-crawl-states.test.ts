import initCrawlState from './init.ts'
import setSavedCrawlStates from './set-saved-crawl-states'

describe('setSavedCrawlStates', () => {
  it('returns a stack of crawl states', async () => {
    const input = [initCrawlState()]
    const actual = await setSavedCrawlStates(input)
    expect(actual).toHaveLength(1)
    expect(actual[0].timestamp).toBe(input[0].timestamp)
  })

  it('is immutable', async () => {
    const input = [initCrawlState()]
    const actual = await setSavedCrawlStates(input)
    expect(actual).not.toBe(input)
  })
})
