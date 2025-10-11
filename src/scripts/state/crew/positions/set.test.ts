import CrawlState, { CrawlTeamSide } from '../../state.ts'
import initCrawlState from '../../init.ts'
import setAssigned from './set.ts'

describe('setAssigned', () => {
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  const expectNotOnTeam = (state: CrawlState, id: string, team: CrawlTeamSide): void => {
    expect(state.crew.teams[team].crew).not.toContain(id)
    expect(state.crew.teams[team].helm).toBeUndefined()
    expect(state.crew.teams[team].lookout).toBeUndefined()
  }

  it.each([
    ['captain', jack],
    ['gunner', [anne, mary]],
    ['captain', []]
  ] as [string, string | string[]][])('sets %s to %s', async (position, value) => {
    const before = initCrawlState()
    const after = await setAssigned(position, value, before, true)
    const arr = typeof value === 'string' ? [value] : value
    expect(after.crew.positions[position]).toHaveLength(arr.length)
    expect(after.crew.positions[position]).toEqual(arr)
    expect(after).not.toBe(before)
  })

  it('adds new quartermaster to starboard crew', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'quartermaster'
    before.crew.teams.larboard.officer = 'sailing-master'
    before.crew.teams.larboard.crew = [anne]
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne

    const actual = await setAssigned('quartermaster', [anne], before, true)
    expect(actual.crew.teams.starboard.crew).toContain(anne)
    expectNotOnTeam(actual, anne, 'larboard')
  })

  it('adds new quartermaster to larboard crew', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'sailing-master'
    before.crew.teams.larboard.officer = 'quartermaster'
    before.crew.teams.starboard.crew = [anne]
    before.crew.teams.starboard.helm = anne
    before.crew.teams.starboard.lookout = anne

    const actual = await setAssigned('quartermaster', [anne], before, true)
    expect(actual.crew.teams.larboard.crew).toContain(anne)
    expectNotOnTeam(actual, anne, 'starboard')
  })

  it('adds new sailing master to larboard crew', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'quartermaster'
    before.crew.teams.larboard.officer = 'sailing-master'
    before.crew.teams.starboard.crew = [anne]
    before.crew.teams.starboard.helm = anne
    before.crew.teams.starboard.lookout = anne

    const actual = await setAssigned('sailing-master', [anne], before, true)
    expect(actual.crew.teams.larboard.crew).toContain(anne)
    expectNotOnTeam(actual, anne, 'starboard')
  })

  it('adds new sailing master to starboard crew', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'sailing-master'
    before.crew.teams.larboard.officer = 'quartermaster'
    before.crew.teams.larboard.crew = [anne]
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne

    const actual = await setAssigned('sailing-master', [anne], before, true)
    expect(actual.crew.teams.starboard.crew).toContain(anne)
    expectNotOnTeam(actual, anne, 'larboard')
  })

  it('won’t let you be quartermaster and sailing master', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    const actual = await setAssigned('sailing-master', [anne], before, true)
    expect(actual.crew.positions.quartermaster).not.toContain(anne)
    expect(actual.crew.positions['sailing-master']).toContain(anne)
  })

  it('won’t let you be sailing master and quartermaster', async () => {
    const before = initCrawlState()
    before.crew.positions['sailing-master'] = [anne]
    const actual = await setAssigned('quartermaster', [anne], before, true)
    expect(actual.crew.positions.quartermaster).toContain(anne)
    expect(actual.crew.positions['sailing-master']).not.toContain(anne)
  })
})
