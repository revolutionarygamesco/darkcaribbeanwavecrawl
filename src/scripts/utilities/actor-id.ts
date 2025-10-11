import { ActorID } from '../state/state.ts'

const getActorId = (actor: Actor | string): ActorID => {
  return typeof actor === 'string' ? actor : actor.id
}

export default getActorId
