import getFeatures from './get.ts'

const removeFeatures = async (actor: Actor, features: string[]): Promise<void> => {
  await actor.deleteEmbeddedDocuments('Item', getFeatures(actor, features))
}

export default removeFeatures
