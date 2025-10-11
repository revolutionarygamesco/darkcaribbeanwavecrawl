import initCrawlState from '../init.ts'
import getSilver from './get.ts'

describe('getSilver', () => {
  it('gets the ship silver from the state', () => {
    const state = initCrawlState()
    expect(getSilver(state)).toBe(state.silver.company)
  })
})
