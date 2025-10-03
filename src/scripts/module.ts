import { MODULE_ID, MODULE_SETTINGS } from './settings'

import Chronometer from './date/Chronometer.ts'

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

import adjustTime from './date/adjust.ts'
import calculateDayNight from './date/day-night.ts'
import calculateLunarPhase from './date/phase.ts'
import getDate from './date/get.ts'
import getTime from './date/time.ts'

import DatePanel from './date/DatePanel.ts'

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

const time = new Chronometer()

Hooks.once('init', async () => {
  initSetting(MODULE_SETTINGS.ROTATION, Number, 180)
  initSetting(MODULE_SETTINGS.STARTDATE, String, '24 July 1715')
  initSetting(MODULE_SETTINGS.MINUTES, Number, 0)
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
    decreaseWind,

    adjustTime,
    calculateDayNight,
    calculateLunarPhase,
    getDate,
    getTime
  }
})

Hooks.once('ready', async () => {
  const datePanel = new DatePanel()
  await datePanel.render(true)

  await time.start()
  time.handlePause(game.paused)
})

Hooks.on('pauseGame', (paused: boolean) => {
  time.handlePause(paused)
})
