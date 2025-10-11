import type CrawlState from '../state.ts'

const getRoster = (state: CrawlState): Actor[] => {
  let ids: string[] = []

  for (const position in state.crew.positions) {
    ids = [...new Set([...ids, ...state.crew.positions[position]])]
  }

  return ids.map(id => game.actors.get(id))
    .filter((a: Actor | undefined): a is Actor => a !== undefined)
}

export default getRoster
