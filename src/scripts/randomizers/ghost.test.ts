import CrawlState, { Ghost } from '../state/state.ts'
import setupCrew, { setupState } from '../utilities/testing/crew.ts'
import completeGhost from '../state/ghosts/complete.ts'
import selectRandomGhost from './ghost.ts'

describe('selectRandomOnDuty', () => {
  setupCrew(true)
  let state: CrawlState
  let haunting: string[]
  let potential: string[]

  beforeEach(() => {
    state = setupState()
    state.ghosts.haunting = [completeGhost(), completeGhost()]
    state.ghosts.potential = [completeGhost()]

    haunting = state.ghosts.haunting.map(ghost => ghost.id)
    potential = state.ghosts.potential.map(ghost => ghost.id)
  })

  it('selects a random ghost', async () => {
    const actual = await selectRandomGhost(1, state) as Ghost
    expect(haunting).toContain(actual.id)
  })

  it('selects multiple ghosts', async () => {
    const actual = await selectRandomGhost(5, state) as Ghost[]
    expect(actual).toHaveLength(haunting.length)
    expect(actual.every(actor => haunting.includes(actor.id))).toBe(true)
  })

  it('excludes potential ghosts', async () => {
    const actual = await selectRandomGhost(1, state) as Ghost
    expect(potential).not.toContain(actual.id)
  })
})
