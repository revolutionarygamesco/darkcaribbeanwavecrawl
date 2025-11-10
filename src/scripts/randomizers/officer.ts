import { MODULE_ID } from '../settings.ts'
import type CrawlState from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import toShuffledArray from '../utilities/shuffle.ts'
import localize from '../utilities/localize.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'

type Office = 'captain' | 'quartermaster' | 'master' | 'bosun'
interface Officer {
  office: string
  officer: Actor
}

const prepareOfficers = (office: Office, list?: string[]): Officer[] => {
  if (!list) return []

  const title = localize(`${MODULE_ID}.crew-panel.positions.glossary.${office}.title`)
  const actors = mapIdsToActors(list)
  return actors.map(officer => ({ office: title, officer }))
}

const selectRandomOfficer = async (
  n: number = 1,
  state?: CrawlState
): Promise<Officer | Officer[]> => {
  const cs = state ?? await getCrawlState()
  const { captain, quartermaster, master, bosun } = cs.crew.positions

  const captains = prepareOfficers('captain', captain)
  const quartermasters = prepareOfficers('quartermaster', quartermaster)
  const masters = prepareOfficers('master', master)
  const bosuns = prepareOfficers('bosun', bosun)
  const officers = [...captains, ...quartermasters, ...masters, ...bosuns]
  const shuffled = toShuffledArray(officers)

  if (shuffled.length < 1) return []
  if (n === 1) return shuffled[0]
  return shuffled.slice(0, n)
}

export default selectRandomOfficer
