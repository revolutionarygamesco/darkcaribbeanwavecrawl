import getCrawlState from './get.ts'

describe('getCrawlState', () => {
  it('returns crawl state', () => {
    const state = getCrawlState()
    expect(state.timestamp).toBe(-8029350000)
  })
})
