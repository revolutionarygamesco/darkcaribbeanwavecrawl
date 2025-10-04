import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import ProvisionsType from './ProvisionsType.ts'
import getDateKey from '../date/key.ts'
import setProvisions from './set.ts'

const loadProvisions = async (date: Date): Promise<Record<ProvisionsType, number> | null> => {
  const ledger = game.settings.get<object>(MODULE_ID, MODULE_SETTINGS.LEDGER) as Record<string, Record<ProvisionsType, number>>
  const key = getDateKey(date)
  if (!(key in ledger)) return null

  await setProvisions('food', ledger[key].food)
  await setProvisions('water', ledger[key].water)
  await setProvisions('rum', ledger[key].rum)

  return ledger[key]
}

export default loadProvisions