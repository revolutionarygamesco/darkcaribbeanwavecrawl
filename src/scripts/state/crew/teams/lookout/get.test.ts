import type CrawlState from '../../../state.ts'
import setupCrew, { setupState, anne } from '../../../../utilities/testing/crew.ts'
import getLookout from './get.ts'

describe('getLookout', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('returns null if the team has no lookout defined', async () => {
    expect(await getLookout('starboard', state)).toBeNull()
  })

  it('returns null if there is no such actor', async () => {
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], lookout: 'pew', onDuty: true }
    expect(await getLookout('starboard', state)).toBeNull()
  })

  it('returns the team’s designated lookout', async () => {
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], lookout: anne, onDuty: true }
    expect((await getLookout('starboard', state))?.id).toBe(anne)
  })
})
