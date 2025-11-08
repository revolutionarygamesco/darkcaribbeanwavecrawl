import CrawlState, { Ghost } from '../state.ts'
import setupCrew, { setupState, dinghy, william } from '../../utilities/testing/crew.ts'
import completeGhost from './complete.ts'
import describeHaunt from './describe.ts'

const createGhosts = (num: number = 0): Ghost[] => {
  const ghosts: Ghost[] = []
  for (let i = 0; i < num; i++) ghosts.push(completeGhost())
  return ghosts
}

describe('describeHaunt', () => {
  setupCrew()

  let state: CrawlState
  const cargo = william.system?.attributes.cargo?.max ?? 2

  beforeEach(() => {
    state = setupState()
  })

  it.each([
    ['zero ghosts', 'normal', 0],
    ['one ghost', 'normal', 1],
    ['two ghosts', 'bloody', 2],
    ['three ghosts', 'dark', 3],
    ['four ghosts', 'lost', 4]
  ] as [string, string, number][])('counts %s as %s on a ship that can carry 0 cargo',
    async (_desc, expected, num) => {
      state.ship.actor = dinghy.id
      state.ghosts = createGhosts(num)
      expect(await describeHaunt(state)).toBe(expected)
    })

  it.each([
    [cargo + 1, 'normal', cargo],
    [(cargo * 2) + 2, 'bloody', cargo],
    [(cargo * 3) + 3, 'dark', cargo],
    [(cargo * 4) + 4, 'lost', cargo]
  ] as [number, string, number][])('counts %d ghosts as %s on a ship that can carry %d cargo',
    async (num, expected, _cargo) => {
      state.ghosts = createGhosts(num)
      expect(await describeHaunt(state)).toBe(expected)
    })

  it('doesn’t go lower than bloody after chapter 4', async () => {
    state.chapter = 5
    expect(await describeHaunt(state)).toBe('bloody')
  })

  it('doesn’t go lower than dark in chapter 6', async () => {
    state.chapter = 6
    expect(await describeHaunt(state)).toBe('dark')
  })
})
