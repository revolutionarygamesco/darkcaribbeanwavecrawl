import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const setMinutes = async (minutes: number): Promise<void> => {
  await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.MINUTES, minutes)
}

export default setMinutes
