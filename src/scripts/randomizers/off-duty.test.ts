import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, extras } from '../utilities/testing/crew.ts'
import selectRandomOffDuty from './off-duty.ts'

describe('selectRandomOffDuty', () => {
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

  it('selects a random member of off-duty watch crew', async () => {
    const actual = await selectRandomOffDuty(1, state) as Actor
    expect(larboard).toContain(actual.id)
  })

  it('selects multiple members of the off-duty watch crew', async () => {
    const actual = await selectRandomOffDuty(5, state) as Actor[]
    expect(actual).toHaveLength(larboard.length)
    expect(actual.every(actor => larboard.includes(actor.id))).toBe(true)
  })
})
