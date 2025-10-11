import ids from '../ids.ts'

const getAdventure = (): Adventure => {
  const { compendium, rel } = ids.adventure
  return game.packs?.get(compendium).get(rel)
}

export default getAdventure
