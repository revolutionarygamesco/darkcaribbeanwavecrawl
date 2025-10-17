import initCrawlState from '../../init.ts'
import getForage from './get.ts'

describe('getForage', () => {
  it('gets whether or not there’s forage from the state', async () => {
    const state = initCrawlState()
    expect(await getForage(state)).toBe(false)
  })
})
