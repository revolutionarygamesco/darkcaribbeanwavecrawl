import type ProvisionsType from './ProvisionsType.ts'
import calculateConsumption from './consumption.ts'
import getAllProvisions from './get-all.ts'
import makeOxfordList from '../utilities/oxford.ts'
import adjustProvisions from './adjust.ts'
import { MODULE_ID } from '../settings.ts'

const consumeProvisions = async (crewSize: number): Promise<Record<ProvisionsType, number>> => {
  const needed = calculateConsumption(crewSize)
  const report = getAllProvisions()
  const types = Object.keys(needed) as ProvisionsType[]
  const out: string[] = []

  for (const type of types) {
    const after = await adjustProvisions(type, needed[type])
    if (after === 0) out.push(game.i18n.localize(`${MODULE_ID}.${type}`))
    report[type] = after
  }

  if (out.length === 0) return report

  const pre = game.i18n.localize(`${MODULE_ID}.provisions-out`)
  await foundry.documents.ChatMessage.create({
    speaker: { alias: game.i18n.localize(`${MODULE_ID}.quartermaster`) },
    content: pre + makeOxfordList(...out)
  })

  return report
}

export default consumeProvisions
