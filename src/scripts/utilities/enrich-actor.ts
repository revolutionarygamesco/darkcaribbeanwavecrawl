const enrichActor = async (actor: Actor): Promise<string> => {
  if (!foundry?.applications?.ux?.TextEditor) return actor.name ?? actor.id
  return await foundry.applications.ux.TextEditor.enrichHTML(`@UUID[Actor.${actor.id}]`)
}

export default enrichActor
