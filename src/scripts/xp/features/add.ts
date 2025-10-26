const addFeature = async (actor: Actor, uuid: string): Promise<void> => {
  const feature = await fromUuid(uuid)
  if (!feature) { console.error(`Could not find feature ${uuid}`); return }
  await actor.createEmbeddedDocuments('Item', [feature.toObject()])
}

export default addFeature
