import { MODULE_ID } from '../settings.ts'
import type ProvisionsType from './ProvisionsType.ts'
import provisionsTypeToSetting from './provisions-type-to-setting.ts'

const setProvisions = async (type: ProvisionsType, amount: number): Promise<void> => {
  await game.settings.set<number>(MODULE_ID, provisionsTypeToSetting(type), amount)
}

export default setProvisions
