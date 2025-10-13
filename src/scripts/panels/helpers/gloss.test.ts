import { MODULE_ID } from '../../settings.ts'
import { PositionData } from '../../state/state.ts'
import glossPosition from './gloss.ts'

describe('glossPosition', () => {
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  const capt: PositionData = {
    assigned: [jack],
    shares: 2
  }

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(jack, { id: jack } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('glosses the position', () => {
    const actual = glossPosition('captain', capt)
    expect(actual.assigned).toEqual([jack])
    expect(actual.actors).toEqual([game.actors.get(jack)])
    expect(actual.shares).toBe(capt.shares)
    expect(actual.title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(actual.description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(actual.sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
