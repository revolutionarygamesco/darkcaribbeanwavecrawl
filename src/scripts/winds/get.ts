import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getWind = (): number | null => {
  return game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.WIND) ?? 2
}

export default getWind
