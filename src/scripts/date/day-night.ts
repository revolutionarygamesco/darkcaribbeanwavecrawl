import { MODULE_ID } from '../settings.ts'
import calculateSunAngle from './sun.ts'
import localize from '../utilities/localize.ts'

const calculateDayNight = (date: Date): string => {
  const angle = calculateSunAngle(date)
  const hour = date.getHours()
  if (angle > 6) return localize(`${MODULE_ID}.time.day`)
  if (angle > -6 && hour < 12) return localize(`${MODULE_ID}.time.dawn`)
  if (angle > -6 && hour >= 12) return localize(`${MODULE_ID}.time.dusk`)
  return localize(`${MODULE_ID}.time.night`)
}

export default calculateDayNight
