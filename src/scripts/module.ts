import { MODULE_ID, MODULE_SETTINGS } from './settings'

import setShip from './ship/set.ts'
import getShip from './ship/get.ts'
import getShipToken from './ship/get-token.ts'

import getChapter from './chapter/get.ts'
import setChapter from './chapter/set.ts'
import advanceChapter from './chapter/advance.ts'
import revertChapter from './chapter/revert.ts'

import getHaunt from './haunt/get.ts'
import setHaunt from './haunt/set.ts'
import increaseHaunt from './haunt/incr.ts'
import decreaseHaunt from './haunt/decr.ts'

import getWind from './winds/get.ts'
import setWind from './winds/set.ts'
import increaseWind from './winds/incr.ts'
import decreaseWind from './winds/decr.ts'

const initSetting = (setting: string, type: any, defaultValue: any, config: boolean = true) => {
  game.settings.register(MODULE_ID, setting, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${setting}.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${setting}.hint`),
    scope: 'world',
    config,
    type,
    default: defaultValue
  })
}

Hooks.once('init', () => {
  initSetting(MODULE_SETTINGS.ROTATION, Number, 180)
  initSetting(MODULE_SETTINGS.STARTDATE, String, '24 July 1715')
  initSetting(MODULE_SETTINGS.HISTORICAL, Boolean, false)
  initSetting(MODULE_SETTINGS.SHIP, String, '', false)
  initSetting(MODULE_SETTINGS.CHAPTER, Number, 1, false)
  initSetting(MODULE_SETTINGS.HAUNT, Number, 1, false)
  initSetting(MODULE_SETTINGS.WIND, Number, 2, false)
  initSetting(MODULE_SETTINGS.SILVER, Number, 0, false)
  initSetting(MODULE_SETTINGS.FOOD, Number, 0, false)
  initSetting(MODULE_SETTINGS.WATER, Number, 0, false)
  initSetting(MODULE_SETTINGS.RUM, Number, 0, false)

  game.modules.get(MODULE_ID).api = {
    setShip,
    getShip,
    getShipToken,

    getChapter,
    setChapter,
    advanceChapter,
    revertChapter,

    setHaunt,
    getHaunt,
    increaseHaunt,
    decreaseHaunt,

    setWind,
    getWind,
    increaseWind,
    decreaseWind
  }
})
