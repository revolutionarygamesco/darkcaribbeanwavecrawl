import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import clamp from '../utilities/clamp.ts'
import getTitle from './title.ts'
import ids from '../ids.ts'

const setChapter = async (num: number): Promise<void> => {
  const ch = clamp(num, 1, 6)

  await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.CHAPTER, ch)

  await canvas.scene.updateEmbeddedDocuments('Drawing', [
    { _id: ids.chapter.text, text: getTitle(ch) }
  ])
}

export default setChapter
