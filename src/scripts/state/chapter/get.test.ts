import initCrawlState from '../init.ts'
import getChapter from './get.ts'

describe('getChapter',  () => {
  it('gets the chapter from the state', async () => {
    const state = initCrawlState()
    expect(await getChapter(state)).toBe(state.chapter)
  })
})
