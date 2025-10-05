import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getSilver = (): number => {
  return game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.SILVER) ?? 0
}

export default getSilver
