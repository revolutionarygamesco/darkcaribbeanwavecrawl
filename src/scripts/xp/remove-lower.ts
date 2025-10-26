import identifySailingXPFeature from './identify-feature.ts'
import removeFeatures from './features/remove.ts'
import ids from '../ids.ts'

const removeLowerLevelFeatures = async (document: Document): Promise<void> => {
  if (!game.actors || document.type !== 'feature' || document.system?.featureType !== 'Sailing Experience') return

  const sourceId = (document as any)._stats?.compendiumSource as string | undefined
  const identification = sourceId ? identifySailingXPFeature(sourceId) : null
  if (!sourceId || !identification) return

  const actor = document.parent?.id ? game.actors.get(document.parent.id) : undefined
  if (!actor) return

  const { position } = identification
  const { able, seasoned, veteran } = ids.xp[position as keyof typeof ids.xp]
  const tiers = [able, seasoned, veteran]
  const index = tiers.indexOf(sourceId)
  if (index < 0) return

  await removeFeatures(actor, tiers.slice(0, index))
}

export default removeLowerLevelFeatures
