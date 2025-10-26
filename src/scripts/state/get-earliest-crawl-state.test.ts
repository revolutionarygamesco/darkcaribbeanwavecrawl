import initCrawlState from './init.ts'
import getEarliestCrawlState from './get-earliest-crawl-state.ts'

describe('getSavedCrawlStates', () => {
  it('returns a stack of crawl states', async () => {
    const earliest = await getEarliestCrawlState()
    expect(earliest?.timestamp).toBe(initCrawlState().timestamp)
  })
})
