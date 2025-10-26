import getSailingExperience from '../get.ts'

const getFeatures = (actor: Actor, source: string[]): string[] => {
  return getSailingExperience(actor)
    .filter(i => source.includes(i.source))
    .map(i => i.item)
}

export default getFeatures
