import { MODULE_ID } from '../../settings.ts'
import { ActorListing, GlossedPositionData } from '../../state/state.ts'
import actorToListing from '../../utilities/actor-to-listing.ts'
import localize from '../../utilities/localize.ts'
import mapIdsToActors from '../../utilities/map-ids-to-actors.ts'

const glossPosition = async (id: string, assigned: string[]): Promise<GlossedPositionData> => {
  const keyPrefix = `${MODULE_ID}.crew-panel.positions.glossary.${id}`
  const actors = mapIdsToActors(assigned)
  const listing: ActorListing[] = []
  for (const actor of actors) listing.push(await actorToListing(actor))

  return {
    id,
    assigned,
    actors: listing,
    title: localize(`${keyPrefix}.title`),
    description: localize(`${keyPrefix}.desc`),
    sans: localize(`${keyPrefix}.sans`)
  }
}

export default glossPosition
