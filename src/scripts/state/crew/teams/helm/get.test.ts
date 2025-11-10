import type CrawlState from '../../../state.ts'
import setupCrew, { setupState, anne } from '../../../../utilities/testing/crew.ts'
import getHelm from './get.ts'

describe('getHelm', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('returns null if the team has no helm defined', async () => {
    expect(await getHelm('starboard', state)).toBeNull()
  })

  it('returns null if there is no such actor', async () => {
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: 'dread-pirate-roberts', onDuty: true }
    expect(await getHelm('starboard', state)).toBeNull()
  })

  it('returns the team’s designated helmsman', async () => {
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: anne, onDuty: true }
    expect((await getHelm('starboard', state))?.id).toBe(anne)
  })
})
