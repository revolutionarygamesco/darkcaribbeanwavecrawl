import { MODULE_ID, MODULE_SETTINGS } from './settings'

import Stopwatch from './time/stopwatch.ts'
import ringBell from './time/ring-bell.ts'

import generateInsult from './insults/generate.ts'

const watch = new Stopwatch()

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

Hooks.once('init', async () => {
  initSetting(MODULE_SETTINGS.ROTATION, Number, 180)
  initSetting(MODULE_SETTINGS.DAYS_SAVED, Number, 14)
  initSetting(MODULE_SETTINGS.HISTORICAL, Boolean, false)

  const crawl = game.modules.get(MODULE_ID)
  if (!crawl) return

  crawl.api = {
    generateInsult
  }
})

Hooks.once('ready', async () => {
  await watch.start()
  watch.handlePause(game.paused)
})

Hooks.on('pauseGame', (paused: boolean) => {
  watch.handlePause(paused)
})

Hooks.on('updateWorldTime', async (worldTime, delta, _, userId) => {
  console.log(`User ${userId} changed time by ${delta} seconds to ${worldTime}`)
  await ringBell()
})
