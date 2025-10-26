import getFeatures from './get.ts'

const hasFeatures = (actor: Actor, features: string[]): boolean => {
  return getFeatures(actor, features).length > 0
}

export default hasFeatures
