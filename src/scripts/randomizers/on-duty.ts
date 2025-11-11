import type CrawlState from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'
import toShuffledArray from '../utilities/shuffle.ts'

const selectRandomOnDuty = async (
  n: number = 1,
  exclusions?: { officer?: boolean, lookout?: boolean, helm?: boolean },
  state?: CrawlState
): Promise<Actor | Actor[]> => {
  const cs = state ?? await getCrawlState()
  const { starboard, larboard } = cs.crew.teams
  const team = starboard.onDuty ? starboard : larboard

  const excludeIds = [
    exclusions?.lookout ?? false ? team.lookout : undefined,
    exclusions?.helm ?? false ? team.helm : undefined,
  ].filter((exclusion: string | undefined): exclusion is string => exclusion !== undefined)
  if (exclusions?.officer === true) excludeIds.push(...cs.crew.positions[team.officer])

  const ids = team.members.filter(id => !excludeIds.includes(id))
  const actors = mapIdsToActors(ids)
  const shuffled = toShuffledArray(actors)

  if (shuffled.length < 1) return []
  if (n === 1) return shuffled[0]
  return shuffled.slice(0, n)
}

export default selectRandomOnDuty
