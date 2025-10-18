export interface SharesRecordAccount {
  holder: Actor
  shares: number
}

interface SharesRecord {
  accounts: Record<string, SharesRecordAccount>
  total: number
}

export default SharesRecord
