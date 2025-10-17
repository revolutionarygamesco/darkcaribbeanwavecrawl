import initCrawlState from '../../init.ts'
import getBarnacles from './get.ts'

describe('getBarnacles', () => {
  it('gets minutes of barnacle growth', async () => {
    const state = initCrawlState()
    expect(await getBarnacles(state)).toBe(state.ship.barnacles)
  })
})
