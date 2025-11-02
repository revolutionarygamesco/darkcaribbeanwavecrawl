import type CrawlState from '../../state.ts'
import { setupState } from '../../../utilities/testing/crew.ts'
import windSpeedFactor from './wind.ts'

describe('windSpeedFactor', () => {
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it.each([
    ['reduces speed to 0 when wind is calm', 1, 0],
    ['cuts speed in half in a breeze', 2, 0.5],
    ['maintains full speed in a gale', 3, 1],
    ['maintains full speed in a storm', 4, 1]
  ] as [string, number, number][])('%s', async (_, winds, expected) => {
    state.winds = winds
    expect(await windSpeedFactor(state)).toBe(expected)
  })
})
