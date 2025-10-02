import calculateSunAngle from './sun.ts'

const calculateDayNight = (date: Date): 'dawn' | 'day' | 'dusk' | 'night' => {
  const angle = calculateSunAngle(date)
  const hour = date.getHours()
  if (angle > 6) return 'day'
  if (angle > -6 && hour < 12) return 'dawn'
  if (angle > -6 && hour >= 12) return 'dusk'
  return 'night'
}

export default calculateDayNight
