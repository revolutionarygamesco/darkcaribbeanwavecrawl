import { MODULE_ID } from '../../settings.ts'
import type CrawlState from '../state.ts'
import setupCrew, { setupState, anne, mary } from '../../utilities/testing/crew.ts'
import isExempt from './exempt.ts'

describe('isExempt', () => {
  setupCrew()

  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('reports that Anne Bonny is exempt because she’s a gunner', async () => {
    const actor = game.actors.get(anne)
    const path = `${MODULE_ID}.crew-panel.positions.glossary.gunner.title`
    expect(await isExempt(anne, state)).toBe(path)
    expect(await isExempt(actor!, state)).toBe(path)
  })

  it('reports that Mary Read is not exempt', async () => {
    const actor = game.actors.get(mary)
    expect(await isExempt(mary, state)).toBe(false)
    expect(await isExempt(actor!, state)).toBe(false)
  })
})
