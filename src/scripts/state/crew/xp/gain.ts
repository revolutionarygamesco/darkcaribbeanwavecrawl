import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import getCopy from '../../get-copy.ts'

const gainXP = async (
  hours: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)

  for (const position in copy.crew.positions) {
    for (const id of copy.crew.positions[position] ?? []) {
      if (!copy.crew.xp[id][position]) copy.crew.xp[id][position] = 0
      copy.crew.xp[id][position] += hours
    }
  }

  return save ? await setCrawlState(copy) : copy
}

export default gainXP
