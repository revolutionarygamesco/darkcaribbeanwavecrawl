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
    const actual = await selectRandomOnDuty(1, undefined, state) as Actor
    expect(starboard).toContain(actual.id)
  })

  it('selects multiple members of the on-duty watch crew', async () => {
    const actual = await selectRandomOnDuty(5, undefined, state) as Actor[]
    expect(actual).toHaveLength(starboard.length)
    expect(actual.every(actor => starboard.includes(actor.id))).toBe(true)
  })

  it('can exclude the lookout', async () => {
    state.crew.teams.starboard.lookout = extras[0]
    const actual = await selectRandomOnDuty(1, { lookout: true }, state) as Actor
    expect(actual.id).toBe(extras[1])
  })

  it('can exclude the helm', async () => {
    state.crew.teams.starboard.helm = extras[0]
    const actual = await selectRandomOnDuty(1, { helm: true }, state) as Actor
    expect(actual.id).toBe(extras[1])
  })
})
