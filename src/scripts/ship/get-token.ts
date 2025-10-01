import getShip from './get.ts'

const getShipToken = (): Token | null => {
  const ship = getShip()
  if (!ship) return null

  const scene = game.scenes?.active
  if (!scene) return null

  const token = scene.tokens.find((t: Token) => t.actorId === ship.id)
  return token ?? null
}

export default getShipToken
