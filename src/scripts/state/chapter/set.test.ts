import initCrawlState from '../init.ts'
import setChapter from './set.ts'

describe('setChapter', () => {
  it('sets the chapter in a new state', async () => {
    const before = initCrawlState()
    const after = await setChapter(2, before, true)
    expect(before.chapter).toBe(1)
    expect(after.chapter).toBe(2)
  })

  it('won’t set a chapter lower than 1', async () => {
    const actual = await setChapter(0, initCrawlState(), true)
    expect(actual.chapter).toBe(1)
  })

  it('won’t set a chapter higher than 6', async () => {
    const actual = await setChapter(40, initCrawlState(), true)
    expect(actual.chapter).toBe(6)
  })
})
