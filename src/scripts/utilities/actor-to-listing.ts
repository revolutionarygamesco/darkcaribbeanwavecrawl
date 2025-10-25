import { ActorListing } from '../state/state.ts'
import enrichActor from './enrich-actor.ts'

const actorToListing = async (actor: Actor): Promise<ActorListing> => {
  const { id, name, img } = actor
  const link = await enrichActor(actor)
  return { id, name, img, link }
}

export default actorToListing
