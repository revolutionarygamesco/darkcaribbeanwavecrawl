import type CrawlState from '../state.ts'

const getRoster = (state: CrawlState): Actor[] => {
  let ids: string[] = []

  for (const position in state.crew.positions) {
    if (!state.crew.positions[position]?.assigned) continue
    ids = [...new Set([...ids, ...state.crew.positions[position].assigned])]
  }

  return ids.map(id => game.actors.get(id))
    .filter((a: Actor | undefined): a is Actor => a !== undefined)
}

export default getRoster
