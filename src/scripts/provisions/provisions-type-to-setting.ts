import { MODULE_SETTINGS } from '../settings.ts'
import type ProvisionsType from './ProvisionsType.ts'

const provisionsTypeToSetting = (type: ProvisionsType): string => {
  if (type === 'food') return MODULE_SETTINGS.FOOD
  if (type === 'water') return MODULE_SETTINGS.WATER
  if (type === 'rum') return MODULE_SETTINGS.RUM
  return MODULE_SETTINGS.SILVER
}

export default provisionsTypeToSetting
