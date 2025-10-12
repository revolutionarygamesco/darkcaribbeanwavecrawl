import initCrawlState from './init.ts'

describe('initCrawlState', () => {
  const state = initCrawlState()

  it('starts minutes at zero', () => {
    expect(state.minutes).toBe(0)
  })

  it('starts members positions as an empty record', () => {
    expect(state.crew.positions).toEqual({})
  })

  it('starts both teams empty', () => {
    expect(state.crew.teams.starboard.members).toHaveLength(0)
    expect(state.crew.teams.larboard.members).toHaveLength(0)
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
    expect(state.silver.company).toBe(0)
  })

  it('starts without a ship', () => {
    expect(state.ship.actor).not.toBeDefined()
  })

  it('starts with a clean hull', () => {
    expect(state.ship.barnacles).toBe(0)
  })

  it('starts in Nassau', () => {
    const { x, y, rotation } = state.ship.position
    expect(x).toBe(2750)
    expect(y).toBe(1083)
    expect(rotation).toBe(30)
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
