import CrawlState, { Provision } from '../state/state.ts'
import setupCrew, { setupState } from '../utilities/testing/crew.ts'
import getRosterCount from '../state/crew/roster/count.ts'
import calculateConsumption from './calculate.ts'

describe('calculateConsumption', () => {
  setupCrew()
  let state: CrawlState
  let count: number = 0

  beforeEach(async () => {
    state = setupState()
    count = await getRosterCount(state)
  })

  it.each([
    ['food', 1],
    ['water', 7/4],
    ['rum', 1/4]
  ] as [Provision, number][])('calculates how much %s the crew consumes in a day', async (type, ratio) => {
    const expected = Math.floor(count * ratio)
    const calculations = await calculateConsumption(state)
    expect(calculations[type]).toBe(expected)
  })

  it('eats the foraged food first', async () => {
    state.provisions.forage = true
    const { food } = await calculateConsumption(state)
    expect(food).toBe(0)
  })
})
