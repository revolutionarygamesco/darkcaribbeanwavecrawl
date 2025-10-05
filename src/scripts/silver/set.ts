import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const setSilver = async (value: number): Promise<number> => {
  await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.SILVER, value)
  return value
}

export default setSilver
