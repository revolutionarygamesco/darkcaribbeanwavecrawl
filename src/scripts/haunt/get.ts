import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getHaunt = (): number | null => {
  return game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.HAUNT) ?? 1
}

export default getHaunt
