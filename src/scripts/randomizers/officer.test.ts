import { MODULE_ID } from '../settings.ts'
import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, jack } from '../utilities/testing/crew.ts'
import selectRandomOfficer from './officer.ts'

describe('selectRandomOfficer', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('selects a random officer', async () => {
    const { office, officer } = await selectRandomOfficer(1, state) as { office: string, officer: Actor }
    expect(office).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(officer.id).toBe(jack)
  })
})
