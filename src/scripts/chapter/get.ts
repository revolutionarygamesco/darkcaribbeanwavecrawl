import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getChapter = (): number | null => {
  return game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.CHAPTER) ?? 1
}

export default getChapter
