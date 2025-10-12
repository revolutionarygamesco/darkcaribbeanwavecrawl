import { MODULE_ID, MODULE_SETTINGS } from './settings'

import generateInsult from './insults/generate.ts'

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
