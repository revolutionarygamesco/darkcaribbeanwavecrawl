import ids from '../ids.ts'
import identifySailingXPFeature from './identify-feature.ts'

describe('identifySailingXPFeature', () => {
  it.each([
    [1000, 'able'],
    [5000, 'seasoned'],
    [10000, 'veteran']
  ] as [number, string][])('returns %d as the minimum XP needed for a %s tier captain feature', (expected, tier) => {
    const id = tier in ids.xp.captain ? ids.xp.captain[tier as keyof typeof ids.xp.captain] : tier
    const { xp, position } = identifySailingXPFeature(id)!
    expect(xp).toBe(expected)
    expect(position).toBe('captain')
  })

  it('returns null if there is no such sailing experience feature', () => {
    expect(identifySailingXPFeature('nope')).toBeNull()
  })
})
