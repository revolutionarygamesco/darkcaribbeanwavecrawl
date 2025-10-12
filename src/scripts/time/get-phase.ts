const anchor = new Date(Date.UTC(2000, 0, 6, 18, 14))
const synodic = 29.530588853

export const lunarIcons: Record<string, string> = {
  'New Moon': 'new',
  'Waxing Crescent': 'waxing-crescent',
  'First Quarter': 'first-quarter',
  'Waxing Gibbous': 'waxing-gibbous',
  'Full Moon': 'full',
  'Waning Gibbous': 'waning-gibbous',
  'Last Quarter': 'last-quarter',
  'Waning Crescent': 'waning-crescent'
}

const getLunarPhase = (date: Date): string => {
  const ms = date.getTime() - anchor.getTime()
  const days = ms / (24 * 60 * 60 * 1000)
  const phase = ((days % synodic) + synodic) % synodic / synodic

  if (phase < 0.0625 || phase >= 0.9375) return 'New Moon'
  if (phase < 0.1875) return 'Waxing Crescent'
  if (phase < 0.3125) return 'First Quarter'
  if (phase < 0.4375) return 'Waxing Gibbous'
  if (phase < 0.5625) return 'Full Moon'
  if (phase < 0.6875) return 'Waning Gibbous'
  if (phase < 0.8125) return 'Last Quarter'
  return 'Waning Crescent'
}

export default getLunarPhase
