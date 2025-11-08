import initCrawlState from '../init.ts'
import getGhosts from './get.ts'

describe('getGhosts', () => {
  it('gets the ghosts from the state', async () => {
    const state = initCrawlState()
    const { haunt, haunting, potential } = await getGhosts(state)
    expect(haunt).toBe('normal')
    expect(haunting).toEqual([])
    expect(potential).toEqual([])
  })
})
