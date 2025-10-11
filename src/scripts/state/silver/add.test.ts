import initCrawlState from '../init.ts'
import addSilver from './add.ts'

describe('addSilver', () => {
  it('adds to the ship silver in a new state', async () => {
    const before = initCrawlState()
    before.silver.company = 100
    const after = await addSilver(100, before, false)
    expect(before.silver.company).toBe(100)
    expect(after.silver.company).toBe(200)
  })

  it('subtracts from the ship silver in a new state', async () => {
    const before = initCrawlState()
    before.silver.company = 100
    const after = await addSilver(-25, before, false)
    expect(before.silver.company).toBe(100)
    expect(after.silver.company).toBe(75)
  })

  it('won’t reduce silver below zero', async () => {
    const actual = await addSilver(-25, initCrawlState(), false)
    expect(actual.silver.company).toBe(0)
  })
})
