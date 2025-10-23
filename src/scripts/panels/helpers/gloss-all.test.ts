import { MODULE_ID } from '../../settings.ts'
import setupCrew, { setupState, jack } from '../../utilities/testing/crew.ts'
import glossAllPositions from './gloss-all.ts'

describe('glossAllPositions', () => {
  setupCrew()
  const before = setupState()

  it('glosses all positions', async () => {
    const actual = await glossAllPositions(before)
    const { assigned, actors, title, description, sans } = actual.captain
    expect(assigned).toEqual([jack])
    expect(actors).toEqual([game.actors.get(jack)])
    expect(title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
