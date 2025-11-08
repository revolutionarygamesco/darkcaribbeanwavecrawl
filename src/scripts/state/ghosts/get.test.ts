import initCrawlState from '../init.ts'
import getGhosts from './get.ts'

describe('getGhosts', () => {
  it('gets the ghosts from the state', async () => {
    const state = initCrawlState()
    const { ghosts, haunt } = await getGhosts(state)
    expect(haunt).toBe('normal')
    expect(ghosts).toEqual([])
  })
})
