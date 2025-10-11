import initCrawlState from '../../init.ts'
import getCrewSilver from './get.ts'

describe('getCrewSilver', () => {
  it('returns the silver held by a crew member from the state', () => {
    const id = 'calico-jack'
    const state = initCrawlState()
    state.silver.crew[id] = 350000
    expect(getCrewSilver(id, state)).toBe(350000)
  })

  it('returns null if no such character can be found', () => {
    const state = initCrawlState()
    expect(getCrewSilver('calico-jack', state)).toBeNull()
  })
})
