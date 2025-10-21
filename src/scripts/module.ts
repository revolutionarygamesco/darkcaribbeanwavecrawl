import { MODULE_ID, MODULE_SETTINGS, DEFAULT_CREW } from './settings'

import Stopwatch from './time/stopwatch.ts'
import getDate from './time/get-date.ts'
import ringBell from './time/ring-bell.ts'

import DatePanel from './panels/date.ts'
import CrewConfigPanel from './panels/crew-config.ts'
import displayCrewPanel from './panels/crew.ts'
import displayLedgerPanel from './panels/ledger.ts'

import generateInsult from './insults/generate.ts'

const watch = new Stopwatch()

const initSetting = (setting: string, type: any, defaultValue?: any, config: boolean = true) => {
  game.settings.register(MODULE_ID, setting, {
    name: `${MODULE_ID}.settings.${setting}.name`,
    hint: `${MODULE_ID}.settings.${setting}.hint`,
    scope: 'world',
    config,
    type,
    default: defaultValue
  })
}

Hooks.once('init', async () => {
  initSetting(MODULE_SETTINGS.CREW_CONFIG, String, DEFAULT_CREW, false)
  game.settings.registerMenu(MODULE_ID, MODULE_SETTINGS.CREW_CONFIG_PANEL, {
    name: `${MODULE_ID}.settings.${MODULE_SETTINGS.CREW_CONFIG_PANEL}.name`,
    label: `${MODULE_ID}.settings.${MODULE_SETTINGS.CREW_CONFIG_PANEL}.name`,
    icon: 'fas fa-anchor',
    type: CrewConfigPanel
  })

  initSetting(MODULE_SETTINGS.ROTATION, Number, 180)
  initSetting(MODULE_SETTINGS.DAYS_SAVED, Number, 14)
  initSetting(MODULE_SETTINGS.HISTORICAL, Boolean, false)

  const crawl = game.modules.get(MODULE_ID)
  if (!crawl) return

  crawl.api = {
    generateInsult,
    displayCrewPanel,
    displayLedgerPanel
  }
})

Hooks.once('ready', async () => {
  await watch.start()
  watch.handlePause(game.paused)

  const datePanel = new DatePanel()
  await datePanel.render(true)
})

Hooks.on('pauseGame', (paused: boolean) => {
  watch.handlePause(paused)
})

Hooks.on('updateWorldTime', async (worldTime, delta) => {
  const previously = worldTime - delta
  const now = getDate(worldTime).toLocaleDateString(undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
  const then = getDate(previously).toLocaleDateString(undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
  console.log(`World time changed from ${then} to ${now}`)
  await ringBell()
})
