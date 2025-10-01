import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const setShip = async (id: string): Promise<void> => {
  await game.settings.set<string>(MODULE_ID, MODULE_SETTINGS.SHIP, id)
}

export default setShip
