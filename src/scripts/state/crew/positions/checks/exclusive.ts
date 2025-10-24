import type CrawlState from '../../../state.ts'
import getPositionConfig from '../../../crew-config/get-position.ts'

const checkExclusivity = async (state: CrawlState): Promise<boolean> => {
  const { positions } = state.crew

  for (const position in positions) {
    const config = getPositionConfig(position)
    const exclusive = config?.exclusive
    if (!exclusive) continue
    const others = Object.keys(positions)
      .filter(key => key !== position)
      .flatMap(key => positions[key])
    const intersection = positions[position].some(id => others.includes(id))
    if (intersection) return false
  }

  return true
}

export default checkExclusivity
