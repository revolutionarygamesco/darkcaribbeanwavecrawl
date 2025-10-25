import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import getRosterActors from '../../crew/roster/actors.ts'
import getCopy from '../../get-copy.ts'

export const fetchCrewSilver = async (
  state?: CrawlState
): Promise<Record<string, number>> => {
  const roster = await getRosterActors(state)
  const ledger: Record<string, number> = {}
  for (const actor of roster) {
    ledger[actor.id] = actor.system.silver ?? 0
  }
  return ledger
}

const updateCrewSilver = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.silver.crew = await fetchCrewSilver(copy)
  return save ? await setCrawlState(copy) : copy
}

export default updateCrewSilver
