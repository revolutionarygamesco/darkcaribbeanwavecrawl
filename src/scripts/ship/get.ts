import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getShip = (): Actor | null => {
  const id = game.settings.get<string>(MODULE_ID, MODULE_SETTINGS.SHIP)
  if (id.length < 1) return null
  return game.actors.get(id) ?? null
}

export default getShip
