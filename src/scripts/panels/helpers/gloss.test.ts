import { MODULE_ID } from '../../settings.ts'
import setupCrew, { jack } from '../../utilities/testing/crew.ts'
import glossPosition from './gloss.ts'

describe('glossPosition', () => {
  setupCrew()

  it('glosses the position', async () => {
    const actual = await glossPosition('captain', [jack])
    const { assigned, actors, title, description, sans } = actual
    expect(assigned).toEqual([jack])
    expect(actors[0].id).toBe(jack)
    expect(title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
