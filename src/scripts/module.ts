import { MODULE_ID, MODULE_SETTINGS, DEFAULT_CREW, SKIP_NEXT_ADVANCE } from './settings'

import Stopwatch from './time/stopwatch.ts'
import ringBell from './time/ring-bell.ts'
import advanceTime from './schedule/advance.ts'

import loadCrawlState from './state/load.ts'
import getEarliestCrawlState from './state/get-earliest-crawl-state.ts'
import rewind from './state/rewind.ts'

import handleAddSailingExperience from './xp/handle-add.ts'
import handleShipUpdate from './state/crew/handle.ts'

import displayDatePanel, { DatePanel } from './panels/date.ts'
import CrewConfigPanel from './panels/crew-config.ts'
import displayCrewPanel from './panels/crew.ts'
import displayLedgerPanel from './panels/ledger.ts'
import displayExploitsPanel from './panels/exploits.ts'
import checkJettisonedProvisions from './provisions/cargo/jettison.ts'
import raiseJollyRoger from './jolly-roger.ts'

import callVote from './voting/call.ts'
import checkVote from './voting/check.ts'

import generateInsult from './insults/generate.ts'
import getAdventure from './state/get-adventure.ts'

const watch = new Stopwatch()
let datePanel: DatePanel
let resettingTimeToLimit: boolean = false

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
    displayLedgerPanel,
    displayExploitsPanel,
    raiseJollyRoger,
    callVote
  }
})

Hooks.once('ready', async () => {
  await watch.start()
  watch.handlePause(game.paused)
  datePanel = await displayDatePanel()
})

Hooks.on('pauseGame', (paused: boolean) => {
  watch.handlePause(paused)
})

Hooks.on('updateWorldTime', async (worldTime, delta) => {
  const now = new Date(game.time.worldTime)
  const then = new Date(worldTime - delta)
  const adventure = await getAdventure()
  const skipAdvanceFlag = adventure?.getFlag(MODULE_ID, SKIP_NEXT_ADVANCE) ?? false
  const skipAdvance = skipAdvanceFlag || resettingTimeToLimit

  if (delta > 0 && !skipAdvance) {
    await advanceTime(then, now)
  } else {
    const earliest = await getEarliestCrawlState()
    const limit = earliest?.timestamp
    if (limit && now.getTime() < limit) {
      resettingTimeToLimit = true
      await game.time.set(limit)
    } else {
      const state = await rewind(now)
      await loadCrawlState(state)
    }
  }

  await ringBell()
  if (datePanel && !resettingTimeToLimit) await datePanel.render(true)
  resettingTimeToLimit = false
  if (adventure && skipAdvanceFlag) await adventure.setFlag(MODULE_ID, SKIP_NEXT_ADVANCE, false)
})

Hooks.on('updateActor', async (document: Document) => {
  await handleShipUpdate(document)
})

Hooks.on('createItem', async (document: Document) => {
  await handleAddSailingExperience(document)
})

Hooks.on('deleteItem', async (document: Document) => {
  await checkJettisonedProvisions(document)
})

Hooks.on('moveToken', async (document: Document, movement: TokenMovementData) => {
  await checkVote(document, movement)
})
