import initCrawlState from '../init.ts'
import addSilver from './add.ts'

describe('addSilver', () => {
  it('adds to the ship silver in a new state', async () => {
    const before = initCrawlState()
    before.silver.ship = 100
    const after = await addSilver(100, before, true)
    expect(before.silver.ship).toBe(100)
    expect(after.silver.ship).toBe(200)
  })

  it('subtracts from the ship silver in a new state', async () => {
    const before = initCrawlState()
    before.silver.ship = 100
    const after = await addSilver(-25, before, true)
    expect(before.silver.ship).toBe(100)
    expect(after.silver.ship).toBe(75)
  })

  it('won’t reduce silver below zero', async () => {
    const actual = await addSilver(-25, initCrawlState(), true)
    expect(actual.silver.ship).toBe(0)
  })
})
