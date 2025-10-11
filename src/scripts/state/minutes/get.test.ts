import initCrawlState from '../init.ts'
import getMinutes from './get.ts'

describe('getMinutes', () => {
  it('gets the minutes from the state', () => {
    const state = initCrawlState()
    expect(getMinutes(state)).toBe(state.minutes)
  })
})
