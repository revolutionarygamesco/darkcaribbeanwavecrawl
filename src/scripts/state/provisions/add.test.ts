import CrawlState, { CrawlProvisions, Provision } from '../state.ts'
import initCrawlState from '../init.ts'
import addProvisions from './add.ts'

describe('addProvisions', () => {
  let before: CrawlState
  const starting: CrawlProvisions = { food: 10, water: 20, rum: 5, forage: false }

  beforeAll(() => {
    before = initCrawlState()
    before.provisions = starting
  })

  it.each(['food', 'water', 'rum'] as Provision[])('adds 15 days to the %s stores', async (type: Provision) => {
    const after = await addProvisions(type, 15, before, false)
    expect(after.provisions[type]).toBe(starting[type] + 15)
    expect(before.provisions[type]).toBe(starting[type])
    expect(after).not.toBe(before)
  })

  it.each(['food', 'water', 'rum'] as Provision[])('reduces the %s stores by 3 days', async (type: Provision) => {
    const after = await addProvisions(type, -3, before, false)
    expect(after.provisions[type]).toBe(starting[type] -3)
  })

  it.each(['food', 'water', 'rum'] as Provision[])('won’t reduce the %s stores below zero', async (type: Provision) => {
    const after = await addProvisions(type, -100, before, false)
    expect(after.provisions[type]).toBe(0)
  })
})
