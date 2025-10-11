import initCrawlState from '../../init.ts'
import setForage from './set.ts'

describe('setForage', () => {
  it.each([true, false])('sets forage to %s', async (value) => {
    const before = initCrawlState()
    const after = await setForage(value, before, false)
    expect(after.provisions.forage).toBe(value)
    expect(before.provisions.forage).toBe(false)
    expect(after).not.toBe(before)
  })
})
