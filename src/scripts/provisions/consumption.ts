import type ProvisionsType from './ProvisionsType.ts'

const calculateConsumption = (crewSize: number): Record<ProvisionsType, number> => {
  const waterInGrog = 4/5
  const rumInGrog = 1/5

  return {
    food: crewSize * -1,
    water: (crewSize + Math.floor(crewSize * waterInGrog)) * -1,
    rum: Math.floor(crewSize * rumInGrog) * -1
  }
}

export default calculateConsumption
