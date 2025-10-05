import calculatePreviousExperience from './prev-xp.ts'

describe('calculatePreviousExperience', () => {
  it('adds directly relevant experience', () => {
    const actual = calculatePreviousExperience(['captain'])
    expect(actual.captain).toBeGreaterThan(0)
    expect(actual.captain).toBeLessThan(151)
  })

  it('adds indirectly relevant experience', () => {
    const actual = calculatePreviousExperience(['officer'])
    expect(actual.captain).toBeGreaterThan(0)
    expect(actual.captain).toBeLessThan(51)
  })
})
