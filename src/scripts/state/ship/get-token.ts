import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import ids from '../../ids.ts'

const getShipToken = async (
  state?: CrawlState
): Promise<Token | null> => {
  const id = (state ?? await getCrawlState()).ship.actor
  if (!id) return null

  const scene = game.scenes.get(ids.map)
  if (!scene) return null

  const token = scene.tokens.find((t: Token) => t.actorId === id)
  return token ?? null
}

export default getShipToken
