import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, extras } from '../utilities/testing/crew.ts'
import selectRandomOnDuty from './on-duty.ts'

describe('selectRandomOnDuty', () => {
  setupCrew(true)
  let state: CrawlState
  const starboard = [extras[0], extras[1]]
  const larboard = [extras[2], extras[3]]

  beforeEach(() => {
    state = setupState()
    state.crew.teams.starboard.onDuty = true
    state.crew.teams.starboard.members = starboard
    state.crew.teams.larboard.members = larboard
  })

  it('selects a random member of on-duty watch crew', async () => {
    const actual = await selectRandomOnDuty(1, state) as Actor
    expect(starboard).toContain(actual.id)
  })

  it('selects multiple members of the on-duty watch crew', async () => {
    const actual = await selectRandomOnDuty(5, state) as Actor[]
    expect(actual).toHaveLength(starboard.length)
    expect(actual.every(actor => starboard.includes(actor.id))).toBe(true)
  })
})
