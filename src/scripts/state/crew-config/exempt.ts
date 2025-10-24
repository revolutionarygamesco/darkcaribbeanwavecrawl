import { MODULE_ID } from '../../settings.ts'
import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import getPositionConfig from './get-position.ts'
import getActorId from '../../utilities/actor-id.ts'
import localize from '../../utilities/localize.ts'

const isExempt = async (
  subject: Actor | string,
  state?: CrawlState
): Promise<string | false> => {
  const cs = (state ?? await getCrawlState())
  const id = getActorId(subject)

  const positions = Object.keys(cs.crew.positions)
    .filter(key => cs.crew.positions[key].includes(id))

  for (const position of positions) {
    const config = getPositionConfig(position)
    if (!config) continue
    if (!config.exempt) continue
    const path = [MODULE_ID, 'crew-panel', 'positions', 'glossary', position, 'title']
    return localize(path.join('.'))
  }

  return false
}

export default isExempt
