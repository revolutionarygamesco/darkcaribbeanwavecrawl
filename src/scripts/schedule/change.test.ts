import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, anne, mary, extras } from '../utilities/testing/crew.ts'
import assign from '../state/crew/positions/assign.ts'
import changeWatch from './change.ts'

describe('changeWatch', () => {
  setupCrew()
  let state: CrawlState
  let crew: string[]

  beforeEach(async () => {
    crew = extras.slice(0, 6)
    let expected = await assign('quartermater', anne, setupState())
    expected = expected ? await assign('master', mary, expected) : null
    expected = expected ? await assign('crew', crew, expected) : null
    expect(expected).not.toBeNull()
    state = expected!

    state.crew.teams.starboard.onDuty = true
    state.crew.teams.starboard.officer = 'quartermaster'
    state.crew.teams.starboard.helm = crew[0]
    state.crew.teams.starboard.lookout = crew[1]
    state.crew.teams.starboard.members = [anne, crew[0], crew[1], crew[2]]

    state.crew.teams.larboard.onDuty = false
    state.crew.teams.larboard.officer = 'master'
    state.crew.teams.larboard.helm = crew[3]
    state.crew.teams.larboard.lookout = crew[4]
    state.crew.teams.larboard.members = [anne, crew[3], crew[4], crew[5]]
  })

  it('switches the watch crew on duty', async () => {
    const actual = await changeWatch('forenoon', state, false)
    const { starboard, larboard } = actual.crew.teams
    expect(starboard.onDuty).toBe(false)
    expect(larboard.onDuty).toBe(true)
  })

  it('awards XP to everyone on the watch crew going off duty', async () => {
    const actual = await changeWatch('forenoon', state, false)
    for (const id of crew) {
      expect(actual.crew.xp[id].crew).toBe(4)
    }
  })

  it('awards less XP for a dog watch', async () => {
    const actual = await changeWatch('second dog', state, false)
    for (const id of crew) {
      expect(actual.crew.xp[id].crew).toBe(2)
    }
  })
})
