import removeLowerLevelFeatures from './remove-lower.ts'
import raiseXP from './raise.ts'
import setCrawlState from '../state/set.ts'
import saveCrawlState from '../state/save.ts'

const handleAddSailingExperience = async (document: Document): Promise<void> => {
  if (!game.actors || document.type !== 'feature' || document.system?.featureType !== 'Sailing Experience') return

  await removeLowerLevelFeatures(document)
  const state = await raiseXP(document)
  await setCrawlState(state)
  await saveCrawlState(state)
}

export default handleAddSailingExperience
