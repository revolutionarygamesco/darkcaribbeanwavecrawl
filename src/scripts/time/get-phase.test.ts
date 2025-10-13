import getLunarPhase from './get-phase.ts'

describe('getLunarPhase', () => {
  it.each([
    ['New Moon', 1],
    ['New Moon', 2],
    ['Waxing Crescent', 3],
    ['Waxing Crescent', 4],
    ['Waxing Crescent', 5],
    ['Waxing Crescent', 6],
    ['First Quarter', 7],
    ['First Quarter', 8],
    ['First Quarter', 9],
    ['First Quarter', 10],
    ['Waxing Gibbous', 11],
    ['Waxing Gibbous', 12],
    ['Waxing Gibbous', 13],
    ['Full Moon', 14],
    ['Full Moon', 15],
    ['Full Moon', 16],
    ['Full Moon', 17],
    ['Waning Gibbous', 18],
    ['Waning Gibbous', 19],
    ['Waning Gibbous', 20],
    ['Waning Gibbous', 21],
    ['Last Quarter', 22],
    ['Last Quarter', 23],
    ['Last Quarter', 24],
    ['Last Quarter', 25],
    ['Waning Crescent', 26],
    ['Waning Crescent', 27],
    ['Waning Crescent', 28],
    ['New Moon', 29],
    ['New Moon', 30],
    ['New Moon', 31]
  ] as [string, number][])(`returns %s for %d July 1715`, (expected, day) => {
    const date = new Date(Date.UTC(1715, 6, day, 0, 0, 0))
    expect(getLunarPhase(date)).toBe(expected)
  })
})
