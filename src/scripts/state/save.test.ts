import initCrawlState from './init.ts'
import saveCrawlState from './save.ts'

describe('saveCrawlState', () => {
  it('adds crawl state to the stack', async () => {
    const actual = await saveCrawlState(initCrawlState(), [], true)
    expect(actual.length).toBe(1)
  })

  it('discards states older than 14 days', async () => {
    const init = initCrawlState()
    const later = initCrawlState()
    later.date.minutes = 15 * 24 * 60

    const actual = await saveCrawlState(later, [init], true)
    expect(actual.length).toBe(1)
  })
})
