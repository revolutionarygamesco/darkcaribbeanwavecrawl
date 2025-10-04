import { MODULE_ID } from '../settings.ts'
import romanize from './romanize.ts'
import localize from '../utilities/localize.ts'

const getTitle = (num: number): string => {
  const chapter = localize(`${MODULE_ID}.Chapter`)
  return `${chapter} ${romanize(num)}.`
}

export default getTitle
