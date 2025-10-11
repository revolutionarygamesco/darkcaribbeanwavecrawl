import initCrawlState from './init.ts'
import cloneCrawlState from './clone.ts'

describe('cloneCrawlState', () => {
  it('immutably and deeplyclones the state', () => {
    const original = initCrawlState()
    const clone = cloneCrawlState(original)
    clone.ship.barnacles = 100
    expect(clone).not.toBe(original)
    expect(clone.ship.barnacles).toBe(100)
    expect(original.ship.barnacles).toBe(0)
  })
})
