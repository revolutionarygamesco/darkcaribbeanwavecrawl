const mapIdsToActors = (ids: string[]): Actor[] => {
  return ids.map(id => game.actors.get(id))
    .filter((a: Actor | undefined): a is Actor => a !== undefined)
}

export default mapIdsToActors
