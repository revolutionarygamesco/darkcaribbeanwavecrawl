import { MODULE_ID } from '../../settings.ts'
import setupCrew, { jack } from '../../utilities/testing/crew.ts'
import glossPosition from './gloss.ts'

describe('glossPosition', () => {
  setupCrew()

  it('glosses the position', () => {
    const actual = glossPosition('captain', [jack])
    const { assigned, actors, title, description, sans } = actual
    expect(assigned).toEqual([jack])
    expect(actors).toEqual([game.actors.get(jack)])
    expect(title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
