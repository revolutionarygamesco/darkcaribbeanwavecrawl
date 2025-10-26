import type CrawlState from './state.ts'
import initCrawlState from './init.ts'
import rewind from './rewind.ts'

describe('rewind', () => {
  const states: Record<string, CrawlState> = {}
  let stack: CrawlState[] = []

  const addState = (date: number): CrawlState => {
    const state = initCrawlState()
    state.timestamp = new Date(Date.UTC(1715, 6, date, 0, 0)).getTime()
    states[`July ${date}`] = state
    return state
  }

  beforeEach(() => {
    for (let d = 15; d <= 17; d++) {
      stack.push(addState(d))
    }
  })

  afterEach(() => {
    for (const key in states) delete states[key]
    stack = []
  })

  it.each([
    ['to the last state before the time given', 16, 'July 16'],
    ['only as far as the earliest state in the stack', 10, 'July 15']
  ] as [string, number, string][])('rewinds %s', async (_desc: string, day, expected) => {
    const date = new Date(Date.UTC(1715, 6, day, 12, 0))
    const actual = await rewind(date, stack, false)
    expect(actual.timestamp).toBe(states[expected].timestamp)
  })
})
