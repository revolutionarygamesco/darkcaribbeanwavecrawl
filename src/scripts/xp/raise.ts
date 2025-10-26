import type CrawlState from '../state/state.ts'
import getCopy from '../state/get-copy.ts'
import identifySailingXPFeature from '../schedule/identify-feature.ts'
import getXP from '../state/crew/xp/get.ts'
import setXP from '../state/crew/xp/set.ts'

const raiseXP = async (
  document: Document,
  before?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(before)
  if (document.type !== 'feature' || document.system?.featureType !== 'Sailing Experience') return copy

  const sourceId = (document as any)._stats?.compendiumSource as string | undefined
  const identification = sourceId ? identifySailingXPFeature(sourceId) : null
  if (!identification) return copy

  const { xp, position } = identification
  const actorId = document.parent?.id
  if (!actorId) return copy

  const curr = await getXP(actorId, position, copy)
  if (curr >= xp) return copy

  return await setXP(actorId, position, xp, copy, save)
}

export default raiseXP
