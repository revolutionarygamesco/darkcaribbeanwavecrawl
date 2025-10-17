import initCrawlState from '../init.ts'
import describeWinds from './describe.ts'
import getWinds from './get.ts'

describe('getWinds', () => {
  it('gets the wind from the state', async () => {
    const state = initCrawlState()
    const { value, description } = await getWinds(state)
    expect(value).toBe(state.winds)
    expect(description).toBe(describeWinds(state.winds))
  })
})
