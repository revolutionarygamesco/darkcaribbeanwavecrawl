import initCrawlState from '../init.ts'
import addChapter from './add.ts'

describe('addChapter', () => {
  it('adds to the chapter in a new state', async () => {
    const before = initCrawlState()
    before.chapter = 2
    const after = await addChapter(2, before, false)
    expect(before.chapter).toBe(2)
    expect(after.chapter).toBe(2 + 2)
  })

  it('won’t set a chapter before 1', async () => {
    const actual = await addChapter(-1, initCrawlState(), false)
    expect(actual.chapter).toBe(1)
  })

  it('won’t set a chapter after 6', async () => {
    const actual = await addChapter(8, initCrawlState(), false)
    expect(actual.chapter).toBe(6)
  })
})
