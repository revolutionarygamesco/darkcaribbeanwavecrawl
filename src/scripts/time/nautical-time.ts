import { MODULE_ID } from '../settings.ts'
import localize from '../utilities/localize.ts'

const describeNauticalTime = (watch: string, bells: number): string => {
  const w = localize(`${MODULE_ID}.watches.${watch}`)
  const b = bells > 0 ? localize(`${MODULE_ID}.bells.${bells}`) : ''
  return b === '' ? w : `${w}, ${b}`
}

export default describeNauticalTime
