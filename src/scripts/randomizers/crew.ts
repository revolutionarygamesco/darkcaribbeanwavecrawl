import type CrawlState from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import getRosterActors from '../state/crew/roster/actors.ts'
import toShuffledArray from '../utilities/shuffle.ts'

const selectRandomCrew = async (
  n: number = 1,
  state?: CrawlState
): Promise<Actor | Actor[]> => {
  const cs = state ?? await getCrawlState()
  const roster = await getRosterActors(cs)
  const shuffled = toShuffledArray(roster)

  if (shuffled.length < 1) return []
  if (n === 1) return shuffled[0]
  return shuffled.slice(0, n)
}

export default selectRandomCrew
