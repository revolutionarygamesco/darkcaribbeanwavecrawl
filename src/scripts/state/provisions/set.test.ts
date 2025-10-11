import CrawlState, { CrawlProvisions, Provision } from '../state.ts'
import initCrawlState from '../init.ts'
import setProvisions from './set.ts'

describe('setProvisions', () => {
  let before: CrawlState
  const starting: CrawlProvisions = { food: 10, water: 20, rum: 5, forage: false }

  beforeAll(() => {
    before = initCrawlState()
    before.provisions = starting
  })

  it.each(['food', 'water', 'rum'] as Provision[])('sets the %s to 15', async (type: Provision) => {
    const after = await setProvisions(type, 15, before, true)
    expect(after.provisions[type]).toBe(15)
    expect(before.provisions[type]).toBe(starting[type])
    expect(after).not.toBe(before)
  })

  it.each(['food', 'water', 'rum'] as Provision[])('won’t set %s below 0', async (type: Provision) => {
    const after = await setProvisions(type, -30, before, true)
    expect(after.provisions[type]).toBe(0)
  })
})
