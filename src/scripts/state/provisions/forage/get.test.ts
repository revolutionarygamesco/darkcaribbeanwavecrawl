import initCrawlState from '../../init.ts'
import getForage from './get.ts'

describe('getForage', () => {
  it('gets whether or not there’s forage from the state', () => {
    const state = initCrawlState()
    expect(getForage(state)).toBe(false)
  })
})
