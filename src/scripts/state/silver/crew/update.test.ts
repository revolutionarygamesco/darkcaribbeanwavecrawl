import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import updateCrewSilver from './update.ts'

describe('updateCrewSilver', () => {
  let before: CrawlState
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'
  const ledger: Record<string, number> = {
    [jack]: 25000,
    [anne]: 30000,
    [mary]: 500
  }

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    before = initCrawlState()
    before.crew.positions.captain = { shares: 1, assigned: [jack] }
    before.crew.positions.gunner = { shares: 1, assigned: [anne, mary] }
    game.actors = new Map<string, Actor>()
    for (const id in ledger) game.actors.set(id, { id, system: { silver: ledger[id] } } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('returns new state with silver updated from character documents', async () => {
    const actual = await updateCrewSilver(before, false)
    for (const id in ledger) {
      expect(actual.silver.crew[id]).toBe(ledger[id])
    }
  })
})
