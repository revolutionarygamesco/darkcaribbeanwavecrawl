import type CrawlState from '../state.ts'
import setupCrew, { setupState, mary, extras } from '../../utilities/testing/crew.ts'
import getRosterCount from './roster/count.ts'
import removeFromCrew from './remove.ts'

describe('removeFromCrew', () => {
  setupCrew(true)

  let before: CrawlState

  beforeEach(() => {
    before = setupState()
    before.crew.teams.starboard.lookout = extras[0]
    before.crew.positions.mate = [extras[0]]
  })

  it('removes a character from the crew', async () => {
    const after = await removeFromCrew(extras[0], before, false)
    expect(after?.crew.positions.mate).toEqual([])
    expect(after?.crew.positions.crew).toEqual([mary])
    expect(after?.crew.teams.starboard.lookout).toBeUndefined()
    expect(await getRosterCount(before)).toBe(4)
    expect(await getRosterCount(after)).toBe(3)
  })
})
