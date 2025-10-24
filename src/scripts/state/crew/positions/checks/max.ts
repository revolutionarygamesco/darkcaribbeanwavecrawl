import type CrawlState from '../../../state.ts'
import getPositionConfig from '../../../crew-config/get-position.ts'

const checkMax = async (state: CrawlState): Promise<boolean> => {
  const { positions } = state.crew

  for (const position in positions) {
    const config = getPositionConfig(position)
    const max = config?.max
    if (!max || positions[position].length <= max) continue
    return false
  }

  return true
}

export default checkMax
