import getSavedCrawlStates from './get-saved-crawl-states.ts'

describe('getSavedCrawlStates', () => {
  it('returns a stack of crawl states', () => {
    const stack = getSavedCrawlStates()
    expect(stack).toHaveLength(1)
  })
})
