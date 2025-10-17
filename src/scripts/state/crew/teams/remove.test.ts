import initCrawlState from '../../init.ts'
import removeTeamMember from './remove.ts'

describe('removeTeamMember', () => {
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  it('removes a member from the team by ID', async () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], helm: anne, lookout: anne, onDuty: true }
    removeTeamMember('starboard', anne, state)
    expect(state.crew.teams.starboard.members).toEqual([mary])
    expect(state.crew.teams.starboard.helm).toBeUndefined()
    expect(state.crew.teams.starboard.lookout).toBeUndefined()
  })

  it('removes multiple members from the team as IDs', async () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], helm: mary, lookout: anne, onDuty: true }
    removeTeamMember('starboard', [anne, mary], state)
    expect(state.crew.teams.starboard.members).toEqual([])
    expect(state.crew.teams.starboard.helm).toBeUndefined()
    expect(state.crew.teams.starboard.lookout).toBeUndefined()
  })

  it('removes a member from the team as Actor', async () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], helm: anne, lookout: anne, onDuty: true }
    removeTeamMember('starboard', { id: anne } as Actor, state)
    expect(state.crew.teams.starboard.members).toEqual([mary])
    expect(state.crew.teams.starboard.helm).toBeUndefined()
    expect(state.crew.teams.starboard.lookout).toBeUndefined()
  })

  it('removes multiple members from the team as an array of Actors', () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne, mary], helm: anne, lookout: mary, onDuty: true }
    const actresses = [{ id: anne }, { id: mary }] as Actor[]
    removeTeamMember('starboard', actresses, state)
    expect(state.crew.teams.starboard.members).toEqual([])
    expect(state.crew.teams.starboard.helm).toBeUndefined()
    expect(state.crew.teams.starboard.lookout).toBeUndefined()
  })
})
