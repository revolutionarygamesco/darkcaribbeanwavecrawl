import { MODULE_ID } from '../settings.ts'
import type ProvisionsType from './ProvisionsType.ts'
import provisionsTypeToSetting from './provisions-type-to-setting.ts'

const getProvisions = (type: ProvisionsType): number => {
  return game.settings.get<number>(MODULE_ID, provisionsTypeToSetting(type)) ?? 0
}

export default getProvisions
