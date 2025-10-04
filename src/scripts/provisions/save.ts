import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import getAllProvisions from './get-all.ts'
import getDateKey from '../date/key.ts'
import ProvisionsType from './ProvisionsType.ts'

const MAX_DAYS = 30

const saveProvisions = async (date: Date): Promise<void> => {
  const ledger = game.settings.get<object>(MODULE_ID, MODULE_SETTINGS.LEDGER) as Record<string, Record<ProvisionsType, number>>
  const curr = getAllProvisions()
  const key = getDateKey(date)
  ledger[key] = { ...curr }

  const keys = Object.keys(ledger).sort()
  if (keys.length > MAX_DAYS) {
    const remove = keys.slice(0, keys.length - MAX_DAYS)
    remove.forEach(key => delete ledger[key])
  }

  await game.settings.set<object>(MODULE_ID, MODULE_SETTINGS.LEDGER, ledger)
}

export default saveProvisions
