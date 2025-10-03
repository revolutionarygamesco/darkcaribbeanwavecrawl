import type ProvisionsType from './ProvisionsType.ts'
import getProvisions from './get.ts'

const getAllProvisions = (): Record<ProvisionsType, number> => {
  return {
    food: getProvisions('food'),
    water: getProvisions('water'),
    rum: getProvisions('rum')
  }
}

export default getAllProvisions
