import assign from './positions/assign.ts'
import removeFromCrew from './remove.ts'
import getCopy from '../get-copy.ts'
import getRosterActors from './roster/actors.ts'
import setCrawlState from '../set.ts'
import saveCrawlState from '../save.ts'

const handleShipUpdate = async (document: Document): Promise<void> => {
  if (document.type !== 'vehicle') return

  let save = false
  let state = await getCopy()
  if (state.ship.actor !== document.id) return

  if (document.system?.captain && !state.crew.positions.captain.includes(document.system.captain)) {
    state = await assign('captain', document.system.captain, state, false) ?? state
    save = true
  }

  const roster = await getRosterActors(state)
  const rosterIds = roster.map(actor => actor.id)
  const shipCrewIds: string[] = document.system?.crews ?? []

  // Anyone listed by the ship should be added as crew to the state
  for (const id of shipCrewIds) {
    if (!rosterIds.includes(id)) {
      state = await assign('crew', id, state, false) ?? state
      save = true
    }
  }

  // Anyone who isn't listed by the ship should be removed as crew from the state
  for (const id of rosterIds) {
    if (!shipCrewIds.includes(id)) {
      state = await removeFromCrew(id, state, false) ?? state
      save = true
    }
  }

  if (save) {
    await setCrawlState(state)
    await saveCrawlState(state)
  }
}

export default handleShipUpdate
