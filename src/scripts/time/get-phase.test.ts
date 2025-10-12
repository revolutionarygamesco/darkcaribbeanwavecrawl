import getLunarPhase from './get-phase.ts'

describe('getLunarPhase', () => {
  it.each([
    ['New Moon', '1 July 1715'],
    ['New Moon', '2 July 1715'],
    ['New Moon', '3 July 1715'],
    ['Waxing Crescent', '4 July 1715'],
    ['Waxing Crescent', '5 July 1715'],
    ['Waxing Crescent', '6 July 1715'],
    ['First Quarter', '7 July 1715'],
    ['First Quarter', '8 July 1715'],
    ['First Quarter', '9 July 1715'],
    ['First Quarter', '10 July 1715'],
    ['Waxing Gibbous', '11 July 1715'],
    ['Waxing Gibbous', '12 July 1715'],
    ['Waxing Gibbous', '13 July 1715'],
    ['Waxing Gibbous', '14 July 1715'],
    ['Full Moon', '15 July 1715'],
    ['Full Moon', '16 July 1715'],
    ['Full Moon', '17 July 1715'],
    ['Full Moon', '18 July 1715'],
    ['Waning Gibbous', '19 July 1715'],
    ['Waning Gibbous', '20 July 1715'],
    ['Waning Gibbous', '21 July 1715'],
    ['Last Quarter', '22 July 1715'],
    ['Last Quarter', '23 July 1715'],
    ['Last Quarter', '24 July 1715'],
    ['Last Quarter', '25 July 1715'],
    ['Waning Crescent', '26 July 1715'],
    ['Waning Crescent', '27 July 1715'],
    ['Waning Crescent', '28 July 1715'],
    ['Waning Crescent', '29 July 1715'],
    ['New Moon', '30 July 1715'],
    ['New Moon', '31 July 1715']
  ] as [string, string][])(`returns %s for %s`, (expected, str) => {
    const date = new Date(str + ' GMT-0500')
    expect(getLunarPhase(date)).toBe(expected)
  })
})
