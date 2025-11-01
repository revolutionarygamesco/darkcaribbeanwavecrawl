import CrawlState, { Provision, CrawlProvisionStores } from '../state/state.ts'
import { setupState } from '../utilities/testing/crew.ts'
import addProvisions from './add.ts'

describe('addProvisions', () => {
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
    state.provisions.food = 25
    state.provisions.water = 25
    state.provisions.rum = 25
  })

  it.each([
    ['add 10', 'food', 10, { food: 35, water: 25, rum: 25 }],
    ['add 10', 'water', 10, { food: 25, water: 35, rum: 25 }],
    ['add 10', 'rum', 10, { food: 25, water: 25, rum: 35 }],
    ['subtract 10', 'food', -10, { food: 15, water: 25, rum: 25 }],
    ['subtract 10', 'water', -10, { food: 25, water: 15, rum: 25 }],
    ['subtract 10', 'rum', -10, { food: 25, water: 25, rum: 15 }],
    ['subtract 30', 'food', -30, { food: 0, water: 25, rum: 25 }],
    ['subtract 30', 'water', -30, { food: 25, water: 0, rum: 25 }],
    ['subtract 30', 'rum', -30, { food: 25, water: 25, rum: 0 }]
  ] as [string, Provision, number, CrawlProvisionStores][])('can %s %s rations', async (_desc, type, amount, expected) => {
    const actual = await addProvisions(type, amount, state)
    expect(actual).toEqual(expected)
  })
})
