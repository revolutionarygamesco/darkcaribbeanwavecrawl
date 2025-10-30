import getCrawlState from './get.ts'

describe('getCrawlState', () => {
  it('returns crawl state', async () => {
    const state = await getCrawlState()
    expect(state.timestamp).toBe(-8029350000000)
  })
})
