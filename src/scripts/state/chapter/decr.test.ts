import initCrawlState from '../init.ts'
import decrChapter from './decr.ts'

describe('decrChapter', () => {
  it('goes to the previous chapter', async () => {
    const before = initCrawlState()
    before.chapter = 6
    const after = await decrChapter(before, false)
    expect(after.chapter).toBe(5)
  })

  it('won’t set a chapter before 1', async () => {
    const before = initCrawlState()
    const after = await decrChapter(initCrawlState(), false)
    expect(after.chapter).toBe(1)
    expect(after).not.toBe(before)
  })
})
