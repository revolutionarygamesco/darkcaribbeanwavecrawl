import { shouldBellRing } from './ring-bell.ts'

describe('shouldBellRing', () => {
  const ringers = [0, 30]
  const scenarios: [boolean, number][] = []
  for (let i = 0; i < 59; i++) scenarios.push([ringers.includes(i), i])

  it.each(scenarios)('returns %s for %d', (expected, minute) => {
    expect(shouldBellRing(minute)).toBe(expected)
  })
})
