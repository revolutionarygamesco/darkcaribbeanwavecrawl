import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import ids from '../../ids.ts'

const getShipToken = (state: CrawlState = getCrawlState()): Token | null => {
  const id = state.ship.actor
  if (!id) return null

  const scene = game.scenes.get(ids.scenes.map)
  if (!scene) return null

  const token = scene.tokens.find((t: Token) => t.actorId === id)
  return token ?? null
}

export default getShipToken
