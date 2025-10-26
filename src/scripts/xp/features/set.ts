import removeFeatures from './remove.ts'
import addFeature from './add.ts'
import hasFeatures from './has.ts'

const setFeatures = async (id: string, index: number, features: string[]): Promise<void> => {
  if (!game.actors.get) return
  const actor = game.actors.get(id)
  if (!actor) return

  if (hasFeatures(actor, features.slice(index))) return
  await removeFeatures(actor, features.slice(0, index))
  await addFeature(actor, features[index])
}

export default setFeatures
