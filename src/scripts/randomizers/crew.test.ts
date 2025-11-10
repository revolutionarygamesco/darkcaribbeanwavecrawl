import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, jack, mary, anne } from '../utilities/testing/crew.ts'
import selectRandomCrew from './crew.ts'

describe('selectRandomCrew', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('selects a random member of the crew', async () => {
    const crew = [jack, mary, anne]
    const actual = await selectRandomCrew(1, state) as Actor
    expect(crew).toContain(actual.id)
  })

  it('selects multiple members of the crew', async () => {
    const crew = [jack, mary, anne]
    const actual = await selectRandomCrew(5, state) as Actor[]
    expect(actual).toHaveLength(3)
    expect(actual.every(actor => crew.includes(actor.id))).toBe(true)
  })
})
