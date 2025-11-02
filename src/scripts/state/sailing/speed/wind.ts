import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import describeWinds from '../../winds/describe.ts'

const windSpeedFactor = async (state?: CrawlState): Promise<number> => {
  const cs = state ?? await getCrawlState()
  const winds = describeWinds(cs.winds)

  switch (winds) {
    case 'Calm': return 0
    case 'Breeze': return 0.5
    default: return 1
  }
}

export default windSpeedFactor
