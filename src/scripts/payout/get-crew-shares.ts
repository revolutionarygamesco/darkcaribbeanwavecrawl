import type CrawlState from '../state/state.ts'
import type SharesRecord from './shares-record.ts'
import getCrawlState from '../state/get.ts'
import getRoster from '../state/crew/get.ts'

const getCrewShares = async (
  state?: CrawlState
): Promise<SharesRecord> => {
  const cs = state ?? await getCrawlState()
  const crew = await getRoster(cs)
  const record: SharesRecord = { accounts: {}, total: 0 }

  for (const holder of crew) {
    const records = Object.values(cs.crew.positions)
      .filter(position => position.assigned.includes(holder.id))
      .map(data => data.shares)
    const shares = records.length > 0 ? Math.max(...records) : 0
    record.accounts[holder.id] = { holder, shares }
  }

  record.total = Object.values(record.accounts)
    .reduce((acc, curr) => acc + curr.shares, 0)
  return record
}

export default getCrewShares
