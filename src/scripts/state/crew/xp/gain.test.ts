import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import gainXP from './gain.ts'

describe('gainXP', () => {
  let before: CrawlState
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  beforeEach(() => {
    before = initCrawlState()
    before.crew.positions = {
      captain: { shares: 1, assigned: [jack] },
      quartermaster: { shares: 1, assigned: [anne] },
      gunner: { shares: 1, assigned: [anne, mary] }
    }
    before.crew.xp = {
      [jack]: { quartermaster: 200, gunner: 10 },
      [anne]: { captain: 0, gunner: 1000 },
      [mary]: { captain: 0, quartermaster: 0, gunner: 1000 }
    }
  })

  it('increases XP in each position the character holds', async () => {
    const after = await gainXP(4, before, false)

    expect(after.crew.xp[jack].captain).toBe(4)
    expect(after.crew.xp[jack].quartermaster).toBe(200)
    expect(after.crew.xp[jack].gunner).toBe(10)

    expect(after.crew.xp[anne].captain).toBe(0)
    expect(after.crew.xp[anne].quartermaster).toBe(4)
    expect(after.crew.xp[anne].gunner).toBe(1004)

    expect(after.crew.xp[mary].captain).toBe(0)
    expect(after.crew.xp[mary].quartermaster).toBe(0)
    expect(after.crew.xp[mary].gunner).toBe(1004)
  })
})
