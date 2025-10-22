import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import gainXP from './gain.ts'

describe('gainXP', () => {
  setupCrew()

  let before: CrawlState

  beforeEach(() => {
    before = setupState()
  })

  it('increases XP in each position the character holds', async () => {
    const after = await gainXP(4, before, false)

    expect(after.crew.xp[jack].captain).toBe(4)
    expect(after.crew.xp[jack].quartermaster).toBe(200)
    expect(after.crew.xp[jack].crew).toBe(10)

    expect(after.crew.xp[anne].captain).toBe(0)
    expect(after.crew.xp[anne].quartermaster).toBe(4)
    expect(after.crew.xp[anne].crew).toBe(1000)

    expect(after.crew.xp[mary].captain).toBe(0)
    expect(after.crew.xp[mary].quartermaster).toBe(0)
    expect(after.crew.xp[mary].crew).toBe(1004)
  })
})
