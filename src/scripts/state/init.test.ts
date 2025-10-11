import initCrawlState from './init.ts'

describe('initCrawlState', () => {
  const state = initCrawlState()

  it('starts minutes at zero', () => {
    expect(state.minutes).toBe(0)
  })

  it('starts crew positions as an empty record', () => {
    expect(state.crew.positions).toEqual({})
  })

  it('starts both teams empty', () => {
    expect(state.crew.teams.starboard.crew).toHaveLength(0)
    expect(state.crew.teams.larboard.crew).toHaveLength(0)
  })

  it('default starboard to quartermaster, larboard to sailing master', () => {
    expect(state.crew.teams.starboard.officer).toBe('quartermaster')
    expect(state.crew.teams.larboard.officer).toBe('sailing-master')
  })

  it('starts xp as an empty record', () => {
    expect(state.crew.xp).toEqual({})
  })

  it('starts all provisions at zero', () => {
    const { food, water, rum } = state.provisions
    const provisions = [food, water, rum]
    for (const provision of provisions) expect(provision).toBe(0)
  })

  it('starts without any foraged food', () => {
    expect(state.provisions.forage).toBe(false)
  })

  it('starts ship silver at zero', () => {
    expect(state.silver.ship).toBe(0)
  })

  it('starts without a ship', () => {
    expect(state.ship.actor).not.toBeDefined()
  })

  it('starts with a clean hull', () => {
    expect(state.ship.barnacles).toBe(0)
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
