import type CrawlState from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'
import toShuffledArray from '../utilities/shuffle.ts'

const selectRandomOffDuty = async (
  n: number = 1,
  state?: CrawlState
): Promise<Actor | Actor[]> => {
  const cs = state ?? await getCrawlState()
  const { starboard, larboard } = cs.crew.teams
  const ids = starboard.onDuty ? larboard.members : starboard.members
  const actors = mapIdsToActors(ids)
  const shuffled = toShuffledArray(actors)

  if (shuffled.length < 1) return []
  if (n === 1) return shuffled[0]
  return shuffled.slice(0, n)
}

export default selectRandomOffDuty
