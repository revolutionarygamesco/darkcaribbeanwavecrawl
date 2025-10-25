import type CrewConfig from '../state/crew-config/crew-config.ts'
import type CrawlState from '../state/state.ts'
import type SharesRecord from './shares-record.ts'
import getCrewConfig from '../state/crew-config/get.ts'
import getCrawlState from '../state/get.ts'
import getRosterActors from '../state/crew/roster/actors.ts'

interface PositionRecord {
  id: string
  assigned: string[]
}

const getCrewShares = async (
  state?: CrawlState
): Promise<SharesRecord> => {
  const config = getCrewConfig()
  const cs = state ?? await getCrawlState()
  const crew = await getRosterActors(cs)
  const record: SharesRecord = { accounts: {}, total: 0 }

  for (const holder of crew) {
    const records = Object.keys(cs.crew.positions)
      .map(id => ({ id, assigned: cs.crew.positions[id] }) as PositionRecord)
      .filter(record => record.assigned.includes(holder.id))
      .map(record => config[record.id as keyof CrewConfig]?.shares ?? 0)
    const shares = records.length > 0 ? Math.max(...records) : 0
    record.accounts[holder.id] = { holder, shares }
  }

  record.total = Object.values(record.accounts)
    .reduce((acc, curr) => acc + curr.shares, 0)
  return record
}

export default getCrewShares
