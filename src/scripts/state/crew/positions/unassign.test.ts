import type CrawlState from '../../state.ts'
import getRosterCount from '../roster/count.ts'
import setupCrew, { setupState, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import unassign from './unassign.ts'

describe('unassign', () => {
  setupCrew()

  let before: CrawlState

  beforeEach(() => {
    before = setupState()
  })

  const bothCrew = (state: CrawlState) => {
    state.crew.positions.gunner = []
    state.crew.positions.crew = [anne, mary]
  }

  it('removes a character from a position in a new state', async () => {
    const after = await unassign('captain', jack, before, false)
    expect(after?.crew.positions.captain).toHaveLength(0)
    expect(after).not.toBe(before)
  })

  it('removes multiple characters from a position in a new state', async () => {
    bothCrew(before)
    const after = await unassign('crew', [anne, mary], before, false)
    expect(after?.crew.positions.crew).toHaveLength(0)
    expect(after).not.toBe(before)
  })

  it('retains other characters', async () => {
    bothCrew(before)
    const after = await unassign('crew', mary, before, false)
    expect(after?.crew.positions.crew).toEqual([anne])
    expect(after).not.toBe(before)
  })

  it('adds character to free crewman if removed from other position', async () => {
    const after = await unassign('gunner', anne, before, false)
    expect(after?.crew.positions.crew).toEqual([mary, anne])
    expect(after).not.toBe(before)
  })

  it('removes character from crew entirely if removed from free crewman', async () => {
    const after = await unassign('crew', mary, before, false)
    const count = await getRosterCount(after!)
    expect(after?.crew.positions.crew).toHaveLength(0)
    expect(count).toBe(2)
    expect(after).not.toBe(before)
  })
})
