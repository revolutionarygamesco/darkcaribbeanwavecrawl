import type CrawlState from '../../../state.ts'
import setupCrew, { setupState, mary, anne } from '../../../../utilities/testing/crew.ts'
import getTeam from './get.ts'

describe('getTeam', () => {
  setupCrew()
  let before: CrawlState
  beforeEach(() => {
    before = setupState()
    before.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], onDuty: true }
  })

  it('returns a roster of every character on the team', async () => {
    const actual = await getTeam('starboard', before)
    expect(actual).toHaveLength(2)
    for (const actor of actual) expect([anne, mary]).toContain(actor.id)
  })
})
