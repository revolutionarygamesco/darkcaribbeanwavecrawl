import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, jack } from '../utilities/testing/crew.ts'
import ids from '../ids.ts'
import raiseXP from './raise.ts'

describe('raiseXP', () => {
  setupCrew()
  let before: CrawlState

  let feature: Document = {
    id: 'able-captain',
    name: 'Able Captain',
    type: 'feature',
    system: { featureType: 'Sailing Experience' },
    _stats: { compendiumSource: ids.xp.captain.able },
  } as unknown as Document

  beforeEach(async () => {
    before = setupState()
    feature.parent = await game.actors.get(jack)
  })

  it('raises the character’s XP to match the feature', async () => {
    const after = await raiseXP(feature, before, false)
    expect(after.crew.xp[jack].captain).toBe(1000)
  })

  it('does nothing if actor already has more XP than that', async () => {
    before.crew.xp[jack].captain = 1234
    const after = await raiseXP(feature, before, false)
    expect(after.crew.xp[jack].captain).toBe(1234)
  })
})
