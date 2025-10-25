import ids from '../ids.ts'
import getMinXP from './get-min-xp.ts'

describe('getMinXP', () => {
  it.each([
    [1000, 'able'],
    [5000, 'seasoned'],
    [10000, 'veteran'],
    [0, 'lalilulelo']
  ] as [number, string][])('returns %d as the minimum XP needed for a %s tier feature', (expected, tier) => {
    const id = tier in ids.xp.captain ? ids.xp.captain[tier as keyof typeof ids.xp.captain] : tier
    expect(getMinXP(id)).toBe(expected)
  })
})
