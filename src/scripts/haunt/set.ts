import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import clamp from '../utilities/clamp.ts'
import setNormal from './normal.ts'
import setBloody from './bloody.ts'
import setDark from './dark.ts'

const setHaunt = async (level: number): Promise<void> => {
  const lvl = clamp(level, 1, 3)

  await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.HAUNT, lvl)

  switch (lvl) {
    case 2: return await setBloody()
    case 3: return await setDark()
    default: return await setNormal()
  }
}

export default setHaunt
