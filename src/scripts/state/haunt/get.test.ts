import initCrawlState from '../init.ts'
import describeHaunt from './describe.ts'
import getHaunt from './get.ts'

describe('getHaunt', () => {
  it('gets the haunting level from the state', async () => {
    const state = initCrawlState()
    const { value, description } = await getHaunt(state)
    expect(value).toBe(state.haunt)
    expect(description).toBe(describeHaunt(state.haunt))
  })
})
