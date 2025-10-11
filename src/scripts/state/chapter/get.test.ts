import initCrawlState from '../init.ts'
import getChapter from './get.ts'

describe('getChapter', () => {
  it('gets the chapter from the state', () => {
    const state = initCrawlState()
    expect(getChapter(state)).toBe(state.chapter)
  })
})
