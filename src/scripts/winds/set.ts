import  { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import clamp from '../utilities/clamp.ts'
import setCalm from './calm.ts'
import setBreeze from './breeze.ts'
import setGale from './gale.ts'
import setStorm from './storm.ts'

const setWind = async (level: number): Promise<void> => {
  const lvl = clamp(level, 1, 4)

  await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.WIND, lvl)

  switch (lvl) {
    case 1: return await setCalm()
    case 3: return await setGale()
    case 4: return await setStorm()
    default: return await setBreeze()
  }
}

export default setWind
