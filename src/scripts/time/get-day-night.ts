import { MODULE_ID } from '../settings.ts'
import getCaribbeanHour from './get-caribbean-hour.ts'
import getSolarAngle from './get-solar-angle.ts'
import localize from '../utilities/localize.ts'

const getDayNight = (date: Date): string => {
  const angle = getSolarAngle(date)
  const hour = getCaribbeanHour(date)
  if (angle > 6) return localize(`${MODULE_ID}.time.day`)
  if (angle > -6 && hour < 12) return localize(`${MODULE_ID}.time.dawn`)
  if (angle > -6 && hour >= 12) return localize(`${MODULE_ID}.time.dusk`)
  return localize(`${MODULE_ID}.time.night`)
}

export default getDayNight
