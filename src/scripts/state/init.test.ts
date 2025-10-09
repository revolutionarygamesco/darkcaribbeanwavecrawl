import initCrawlState from './init.ts'
import {CrawlTeam} from './state.ts'

describe('initCrawlState', () => {
  const state = initCrawlState()

  const expectDate = (actual: Date, year: number, month: number, date: number): void => {
    expect(actual.getFullYear()).toBe(year)
    expect(actual.getMonth()).toBe(month)
    expect(actual.getDate()).toBe(date)
  }

  const expectTeam = (team: CrawlTeam, officer: string): void => {
    expect(team.officer).toBe(officer)
    expect(team.helm).toBe('')
    expect(team.lookout).toBe('')
    expect(team.crew).toHaveLength(0)
  }

  it('defaults start date to 24 July 1715', () => {
    expectDate(state.date.start, 1715, 6, 24)
  })

  it('takes start date from settings', () => {
    game.settings.get = jest.fn().mockReturnValue('21 December 1719')
    const state = initCrawlState()
    expectDate(state.date.start, 1719, 11, 21)
    jest.clearAllMocks()
  })

  it('starts minutes at zero', () => {
    expect(state.date.minutes).toBe(0)
  })

  it('starts crew positions as an empty map', () => {
    expect(state.crew.positions.size).toBe(0)
  })

  it('starts both teams empty', () => {
    expectTeam(state.crew.teams[0], 'quartermaster')
    expectTeam(state.crew.teams[1], 'sailing-master')
  })

  it('starts xp as an empty map', () => {
    expect(state.crew.xp.size).toBe(0)
  })

  it('starts all provisions at zero', () => {
    const { food, water, rum } = state.provisions
    const provisions = [food, water, rum]
    for (const provision of provisions) expect(provision).toBe(0)
  })

  it('starts ship silver at zero', () => {
    expect(state.silver.ship).toBe(0)
  })

  it('starts without a ship', () => {
    const { actor, token } = state.ship
    const ids = [actor, token]
    for (const id of ids) expect(id).toBe('')
  })

  it('starts with chapter 1', () => {
    expect(state.chapter).toBe(1)
  })

  it('starts with a nice breeze', () => {
    expect(state.winds).toBe(2)
  })

  it('starts haunting at level 1', () => {
    expect(state.haunt).toBe(1)
  })
})
