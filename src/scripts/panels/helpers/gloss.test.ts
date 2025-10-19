import { MODULE_ID } from '../../settings.ts'
import { PositionData } from '../../state/state.ts'
import setupCrew, { jack } from '../../utilities/testing/crew.ts'
import glossPosition from './gloss.ts'

describe('glossPosition', () => {
  setupCrew()

  const capt: PositionData = {
    assigned: [jack],
    shares: 2
  }

  it('glosses the position', () => {
    const actual = glossPosition('captain', capt)
    const { assigned, actors, shares, title, description, sans } = actual
    expect(assigned).toEqual([jack])
    expect(actors).toEqual([game.actors.get(jack)])
    expect(shares).toBe(capt.shares)
    expect(title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
