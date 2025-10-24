const getActor = (actor: Actor | string): Actor | null => {
  if (typeof actor === 'string') return game.actors.get(actor) ?? null
  return actor
}

export default getActor
