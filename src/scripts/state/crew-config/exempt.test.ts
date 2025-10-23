import type CrawlState from '../state.ts'
import setupCrew, { setupState, anne, mary } from '../../utilities/testing/crew.ts'
import isExempt from './exempt.ts'

describe('isExempt', () => {
  setupCrew()

  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it.each([
    ['Anne Bonny is', anne, true],
    ['Mary Read is not', mary, false]
  ] as [string, string, boolean][])(
    'reports that %s exempt from watch duty',
    async (_, id, expected
    ) => {
    const actor = game.actors.get(id)
    expect(await isExempt(id, state)).toBe(expected)
    expect(await isExempt(actor!, state)).toBe(expected)
  })
})
