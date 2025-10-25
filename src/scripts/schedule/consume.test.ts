import CrawlState, { Provision } from '../state/state.ts'
import setupCrew, { setupState } from '../utilities/testing/crew.ts'
import consume from './consume.ts'

describe('consume', () => {
  setupCrew()
  let state: CrawlState
  const amount: Record<Provision, number> = { food: 10, water: 10, rum: 10 }

  beforeEach(async () => {
    state = setupState()
  })

  it('reduces provisions', async () => {
    state.provisions.food = 20
    state.provisions.water = 20
    state.provisions.rum = 20

    const actual = await consume(state, amount)
    const { food, water, rum } = actual.provisions

    expect(food).toBe(10)
    expect(water).toBe(10)
    expect(rum).toBe(10)
  })

  it('eats the foraged food first', async () => {
    state.provisions.forage = true
    state.provisions.food = 20
    state.provisions.water = 20
    state.provisions.rum = 20

    const actual = await consume(state, amount)
    const { forage, food, water, rum } = actual.provisions

    expect(forage).toBe(false)
    expect(food).toBe(20)
    expect(water).toBe(10)
    expect(rum).toBe(10)
  })
})
