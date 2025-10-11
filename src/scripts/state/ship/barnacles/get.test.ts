import initCrawlState from '../../init.ts'
import getBarnacles from './get.ts'

describe('getBarnacles', () => {
  it('gets minutes of barnacle growth', () => {
    const state = initCrawlState()
    expect(getBarnacles(state)).toBe(state.ship.barnacles)
  })
})
