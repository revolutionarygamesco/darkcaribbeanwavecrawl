import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getAssigned = (position: string, state: CrawlState = getCrawlState()): Actor[] => {
  const pos = state.crew.positions[position]
  const ids = pos && pos.assigned ? pos.assigned : []
  return ids
    .map(id => game.actors.get(id))
    .filter((a: unknown): a is Actor => a !== undefined)
}

export default getAssigned
