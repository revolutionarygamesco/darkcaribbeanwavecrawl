import { MODULE_ID } from '../../../settings.ts'
import type CrawlState from '../../state.ts'
import isExempt from '../../crew-config/exempt.ts'
import getActor from '../../../utilities/actor.ts'
import localize from '../../../utilities/localize.ts'
import notify from '../../../utilities/notify.ts'

const warnExempt = async (
  characters: Array<Actor | string>,
  state: CrawlState
): Promise<void> => {
  if (!game.actors) return
  const actors = characters.map(a => getActor(a))
    .filter((actor: Actor | null): actor is Actor => actor !== null)
  for (const actor of actors) {
    const position = await isExempt(actor, state)
    if (!position) continue

    const path = [MODULE_ID, 'notifications', 'exempt']
    const msg = localize(path.join('.'), { position, name: actor.name })
    await notify('warn', msg)
  }
}

export default warnExempt
