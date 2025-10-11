import getCrawlState from './get.ts'

describe('getCrawlState', () => {
  it('returns crawl state', () => {
    const state = getCrawlState()
    expect(state.minutes).toBe(0)
  })
})
