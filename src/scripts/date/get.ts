import getStartDate from './get-start.ts'

const getDate = (): Date => {
  const start = getStartDate()
  const elapsed = game.time.worldTime * 1000
  return new Date(start.getTime() + elapsed)
}

export default getDate
