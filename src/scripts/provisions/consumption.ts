import type ProvisionsType from './ProvisionsType.ts'

const calculateConsumption = (crewSize: number): Record<ProvisionsType, number> => {
  const waterInGrog = 4/5
  const rumInGrog = 1/5

  return {
    food: crewSize,
    water: crewSize + Math.floor(crewSize * waterInGrog),
    rum: Math.floor(crewSize * rumInGrog)
  }
}

export default calculateConsumption
