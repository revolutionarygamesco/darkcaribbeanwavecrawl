import { MODULE_ID } from '../settings.ts'
import CrawlState, { Provision } from '../state/state.ts'
import getCopy from '../state/get-copy.ts'
import calculateConsumption from './calculate.ts'
import addProvisions from '../state/provisions/add.ts'
import oxford from '../utilities/oxford.ts'
import localize from '../utilities/localize.ts'

const consume = async (
  state?: CrawlState,
  amount?: Record<Provision, number>
): Promise<CrawlState> => {
  let copy = await getCopy(state)
  const amt = amount ?? await calculateConsumption(copy)

  const food = copy.provisions.forage ? 0 : amt.food
  copy = await addProvisions('food', food * -1, copy, false)
  copy = await addProvisions('water', amt.water * -1, copy, false)
  copy = await addProvisions('rum', amt.rum * -1, copy, false)

  copy.provisions.forage = false

  const all: Provision[] = ['food', 'water', 'rum']
  const out = all.filter(type => copy.provisions[type] === 0)
  if (foundry?.documents?.ChatMessage && out.length > 0) {
    const speakerPath = [MODULE_ID, 'crew-panel', 'positions', 'glossary', 'quartermaster', 'title']
    const contentPath = [MODULE_ID, 'messages', 'provisions-out']

    await foundry.documents.ChatMessage.create({
      speaker: { alias: game.i18n.localize(speakerPath.join('.')) },
      content: localize(contentPath.join('.'), { provisions: oxford(...out) })
    })
  }

  return copy
}

export default consume
