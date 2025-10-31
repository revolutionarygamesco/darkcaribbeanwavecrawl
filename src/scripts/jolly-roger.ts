import { MODULE_ID } from './settings.ts'
import openAlterExploitDialog from './panels/dialogs/alter-exploit.ts'
import getAssigned from './state/crew/positions/get.ts'
import getExploits from './state/exploits/get.ts'
import localize from './utilities/localize.ts'
import ids from './ids.ts'

const getCommon = (): {
  path: string[],
  table: string,
  speaker: any
} => {
  const path = [MODULE_ID, 'jolly-roger']
  const tableName = localize([...path, 'reaction-table-name'].join('.'))
  const table = `@UUID[RollTable.${ids.tables.jollyRogerReactions}]{${tableName}}`
  const speaker = { alias: localize([...path, 'speaker'].join('.')) }
  return { path, table, speaker }
}

const failRecognition = async (): Promise<void> => {
  const { path, table, speaker } = getCommon()
  const intro = localize([...path, 'unrecognized'].join('.'))
  const morale = localize([...path, 'reaction'].join('.'), { DR: 4, table })
  const content = `<p>${intro}</p><p>${morale}</p>`

  await foundry.documents.ChatMessage.create({ speaker, content, whisper: [game.user.id] })
}

const raiseJollyRoger = async (): Promise<void> => {
  if (!game?.user.isGM) return

  const { path, table, speaker } = getCommon()

  const captains = await getAssigned('captain')
  const captain = captains.length > 0 ? captains[0] : null
  if (!captain) { await failRecognition(); return }

  const exploits = await getExploits(captain.id)
  const roll = new foundry.dice.Roll('1d20')
  await roll.toMessage({ speaker }, { rollMode: 'whisper' })
  const index = roll.total <= exploits.length ? roll.total - 1 : null
  if (index === null) { await failRecognition(); return }

  await openAlterExploitDialog(captain, index, async () => {
    const updated = await getExploits(captain.id)
    const { legend } = updated[index]
    const heard = legend[legend.length - 1]

    const DR = 4 + exploits.length
    const intro = localize([...path, 'recognized'].join('.'))
    const morale = localize([...path, 'reaction'].join('.'), { DR, table })
    const content = `<p>${intro}</p><p><em>${heard}</em></p><p>${morale}</p>`
    await foundry.documents.ChatMessage.create({ speaker, content, whisper: [game.user.id] })
  })
}

export default raiseJollyRoger
