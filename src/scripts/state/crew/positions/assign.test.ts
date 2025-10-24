import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack, anne } from '../../../utilities/testing/crew.ts'
import assign from './assign.ts'

describe('assign', () => {
  setupCrew()

  let before: CrawlState

  beforeEach(() => {
    before = setupState()
  })

  it('assigns a character to a position in a new state', async () => {
    const after = await assign('quartermaster', jack, before, false)
    expect(after?.crew.positions.quartermaster).toEqual([jack])
    expect(after).not.toBe(before)
  })

  it('removes character from other positions if new position is exclusive', async () => {
    const after = await assign('quartermaster', jack, before, false)
    expect(after?.crew.positions.captain).toHaveLength(0)
  })

  it('removes character from previously-held exclusive positions', async () => {
    const after = await assign('crew', jack, before, false)
    expect(after?.crew.positions.captain).toHaveLength(0)
    expect(after?.crew.positions.crew).toContain(jack)
  })

  it('won’t let you exceed the max for a position', async () => {
    const after = await assign('captain', anne, before, false)
    expect(after).toBeNull()
  })

  it('adds you to quartermaster’s watch crew if assigned quartermaster', async () => {
    const after = await assign('quartermaster', anne, before, false)
    expect(after?.crew.teams.starboard.members).toContain(anne)
  })

  it('adds you to sailing master’s watch crew if assigned sailing master', async () => {
    const after = await assign('master', anne, before, false)
    expect(after?.crew.teams.larboard.members).toContain(anne)
  })

  it('removes you from sailing master’s watch crew if assigned quartermaster', async () => {
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne
    before.crew.teams.larboard.members = [anne]
    const after = await assign('quartermaster', anne, before, false)

    expect(after?.crew.teams.larboard.helm).toBeUndefined()
    expect(after?.crew.teams.larboard.lookout).toBeUndefined()
    expect(after?.crew.teams.larboard.members).toHaveLength(0)
  })

  it('removes you from quartermaster’s watch crew if assigned sailing master', async () => {
    before.crew.teams.starboard.helm = anne
    before.crew.teams.starboard.lookout = anne
    before.crew.teams.starboard.members = [anne]
    const after = await assign('master', anne, before, false)

    expect(after?.crew.teams.starboard.helm).toBeUndefined()
    expect(after?.crew.teams.starboard.lookout).toBeUndefined()
    expect(after?.crew.teams.starboard.members).toHaveLength(0)
  })
})
