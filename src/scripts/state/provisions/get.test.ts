import CrawlState, { CrawlProvisions, Provision } from '../state.ts'
import initCrawlState from '../init.ts'
import getProvisions from './get.ts'

describe('getProvisions', () => {
  let state: CrawlState
  const expected: CrawlProvisions = { food: 10, water: 20, rum: 5, forage: false }

  beforeAll(() => {
    state = initCrawlState()
    state.provisions = expected
  })

  it.each(['food', 'water', 'rum'] as Provision[])('gets the %s', (type: Provision) => {
    expect(getProvisions(type, state)).toBe(expected[type])
  })
})
