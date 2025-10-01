import { MODULE_ID, MODULE_SETTINGS } from './settings'

export const setShip = async (id: string): Promise<void> => {
  await game.settings.set<string>(MODULE_ID, MODULE_SETTINGS.SHIP, id)
}

export const getShip = (): Actor | null => {
  const id = game.settings.get<string>(MODULE_ID, MODULE_SETTINGS.SHIP)
  if (id.length < 1) return null
  return game.actors.get(id) ?? null
}

export const getShipToken = (): Token | null => {
  const ship = getShip()
  if (!ship) return null

  const scene = game.scenes?.active
  if (!scene) return null

  const token = scene.tokens.find((t: Token) => t.actorId === ship.id)
  return token ?? null
}
