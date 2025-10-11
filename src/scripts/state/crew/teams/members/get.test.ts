import type CrawlState from '../../../state.ts'
import initCrawlState from '../../../init.ts'
import getTeam from './get.ts'

describe('getTeam', () => {
  let before: CrawlState
  let originalActors: Map<string, Actor>
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    before = initCrawlState()
    before.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], onDuty: true }

    game.actors = new Map<string, Actor>()
    for (const id of before.crew.teams.starboard.members) game.actors.set(id, { id } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('returns a roster of every character on the team', () => {
    const actual = getTeam('starboard', before)
    expect(actual).toHaveLength(2)
    for (const actor of actual) expect([anne, mary]).toContain(actor.id)
  })
})
