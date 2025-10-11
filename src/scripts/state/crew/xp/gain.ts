import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'

const gainXP = async (
  hours: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)

  for (const position in copy.crew.positions) {
    for (const id of copy.crew.positions[position]) {
      if (!copy.crew.xp[id][position]) copy.crew.xp[id][position] = 0
      copy.crew.xp[id][position] += hours
    }
  }

  return save ? await setCrawlState(copy) : copy
}

export default gainXP
