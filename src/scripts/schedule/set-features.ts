import type CrawlState from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import getXP from '../state/crew/xp/get.ts'
import rank from './rank.ts'
import ids from '../ids.ts'

const getSailingExperience = (actor: Actor): Array<{ item: string, source: string }> => {
  return Array.from(actor.collections.items.values())
    .filter(item => item.type === 'feature' && item.system.featureType === 'Sailing Experience')
    .map(item => ({ item: item._id, source: item.getFlag('core', '_stats.compendiumSource') }))
    .filter((i: unknown): i is { item: string, source: string } => {
      if (!(typeof i === 'object' && i !== null && 'item' in i && 'source' in i)) return false
      const { item, source } = i
      return typeof item === 'string' && typeof source === 'string'
    })
}

const getFeatures = (actor: Actor, source: string[]): string[] => {
  return getSailingExperience(actor)
    .filter(i => source.includes(i.source))
    .map(i => i.item)
}

const addFeature = async (actor: Actor, uuid: string): Promise<void> => {
  const feature = await fromUuid(uuid)
  if (!feature) { console.error(`Could not find feature ${uuid}`); return }
  await actor.createEmbeddedDocuments('Item', [feature.toObject()])
}

const removeFeatures = async (actor: Actor, features: string[]): Promise<void> => {
  await actor.deleteEmbeddedDocuments('Item', getFeatures(actor, features))
}

const hasFeatures = (actor: Actor, features: string[]): boolean => {
  return getFeatures(actor, features).length > 0
}

const set = async (id: string, index: number, features: string[]): Promise<void> => {
  if (!game.actors.get) return
  const actor = game.actors.get(id)
  if (!actor) return

  if (hasFeatures(actor, features.slice(index))) return
  await removeFeatures(actor, features.slice(0, index))
  await addFeature(actor, features[index])
}

const setFeatures = async (state?: CrawlState): Promise<void> => {
  const cs = state ?? await getCrawlState()
  if (!game.actors.get) return

  for (const id in cs.crew.xp) {
    for (const position in cs.crew.xp[id]) {
      if (!(position in ids.xp)) continue
      const { able, seasoned, veteran } = ids.xp[position as keyof typeof ids.xp]
      const tiers = [able, seasoned, veteran]
      const xp = await getXP(id, position, cs)
      const r = rank(xp)

      if (r === 'able') await set(id, 0, tiers)
      if (r === 'seasoned') await set(id, 1, tiers)
      if (r === 'veteran') await set(id, 2, tiers)
    }
  }
}

export default setFeatures
