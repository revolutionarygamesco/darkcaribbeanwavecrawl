import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getMinutes = (): number => {
  return game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.MINUTES) ?? 0
}

export default getMinutes
