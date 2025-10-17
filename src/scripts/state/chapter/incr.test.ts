import initCrawlState from '../init.ts'
import incrChapter from './incr.ts'

describe('incrChapter', () => {
  it('goes to the next chapter', async () => {
    const actual = await incrChapter(initCrawlState(), false)
    expect(actual.chapter).toBe(2)
  })

  it('won’t set a chapter after 6', async () => {
    const before = initCrawlState()
    before.chapter = 6
    const actual = await incrChapter(before, false)
    expect(actual.chapter).toBe(6)
    expect(actual).not.toBe(before)
  })
})
