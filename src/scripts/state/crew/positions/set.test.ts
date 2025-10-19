import CrawlState, { CrawlTeamSide } from '../../state.ts'
import initCrawlState from '../../init.ts'
import setAssigned from './set.ts'

describe('setAssigned', () => {
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  const expectNotOnTeam = (state: CrawlState, id: string, team: CrawlTeamSide): void => {
    expect(state.crew.teams[team].members).not.toContain(id)
    expect(state.crew.teams[team].helm).toBeUndefined()
    expect(state.crew.teams[team].lookout).toBeUndefined()
  }

  it.each([
    ['captain', jack],
    ['gunner', [anne, mary]],
    ['captain', []]
  ] as [string, string | string[]][])('sets %s to %s', async (position, value) => {
    const before = initCrawlState()
    const after = await setAssigned(position, value, before, false)
    const arr = typeof value === 'string' ? [value] : value
    expect(after.crew.positions[position].assigned).toHaveLength(arr.length)
    expect(after.crew.positions[position].assigned).toEqual(arr)
    expect(after).not.toBe(before)
  })

  it('adds new quartermaster to starboard members', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'quartermaster'
    before.crew.teams.larboard.officer = 'sailing-master'
    before.crew.teams.larboard.members = [anne]
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne

    const actual = await setAssigned('quartermaster', [anne], before, false)
    expect(actual.crew.teams.starboard.members).toContain(anne)
    expectNotOnTeam(actual, anne, 'larboard')
  })

  it('adds new quartermaster to larboard members', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'sailing-master'
    before.crew.teams.larboard.officer = 'quartermaster'
    before.crew.teams.starboard.members = [anne]
    before.crew.teams.starboard.helm = anne
    before.crew.teams.starboard.lookout = anne

    const actual = await setAssigned('quartermaster', [anne], before, false)
    expect(actual.crew.teams.larboard.members).toContain(anne)
    expectNotOnTeam(actual, anne, 'starboard')
  })

  it('adds new sailing master to larboard members', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'quartermaster'
    before.crew.teams.larboard.officer = 'sailing-master'
    before.crew.teams.starboard.members = [anne]
    before.crew.teams.starboard.helm = anne
    before.crew.teams.starboard.lookout = anne

    const actual = await setAssigned('sailing-master', [anne], before, false)
    expect(actual.crew.teams.larboard.members).toContain(anne)
    expectNotOnTeam(actual, anne, 'starboard')
  })

  it('adds new sailing master to starboard members', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'sailing-master'
    before.crew.teams.larboard.officer = 'quartermaster'
    before.crew.teams.larboard.members = [anne]
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne

    const actual = await setAssigned('sailing-master', [anne], before, false)
    expect(actual.crew.teams.starboard.members).toContain(anne)
    expectNotOnTeam(actual, anne, 'larboard')
  })

  it('won’t let you be quartermaster and sailing master', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = { shares: 1, assigned: [anne] }
    const actual = await setAssigned('sailing-master', [anne], before, false)
    expect(actual.crew.positions.quartermaster.assigned).not.toContain(anne)
    expect(actual.crew.positions['sailing-master'].assigned).toContain(anne)
  })

  it('won’t let you be sailing master and quartermaster', async () => {
    const before = initCrawlState()
    before.crew.positions['sailing-master'] = { shares: 1, assigned: [anne] }
    const actual = await setAssigned('quartermaster', [anne], before, false)
    expect(actual.crew.positions.quartermaster.assigned).toContain(anne)
    expect(actual.crew.positions['sailing-master'].assigned).not.toContain(anne)
  })

  it('removes you from free crewman if you’re anything else', async () => {
    const before = initCrawlState()
    before.crew.positions.crewman = { shares: 1, assigned: [anne] }
    const actual = await setAssigned('bosun', [anne], before, false)
    expect(actual.crew.positions.bosun.assigned).toContain(anne)
    expect(actual.crew.positions.crewman.assigned).not.toContain(anne)
  })
})
