import initCrawlState from '../../init.ts'
import getCrewSilver from './get.ts'

describe('getCrewSilver', () => {
  it('returns the silver held by a members member from the state', async () => {
    const id = 'calico-jack'
    const state = initCrawlState()
    state.silver.crew[id] = 350000
    expect(await getCrewSilver(id, state)).toBe(350000)
  })

  it('returns null if no such character can be found', async () => {
    const state = initCrawlState()
    expect(await getCrewSilver('calico-jack', state)).toBeNull()
  })
})
