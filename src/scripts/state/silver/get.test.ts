import initCrawlState from '../init.ts'
import getSilver from './get.ts'

describe('getSilver', () => {
  it('gets the ship silver from the state', async () => {
    const state = initCrawlState()
    expect(await getSilver(state)).toBe(state.silver.company)
  })
})
