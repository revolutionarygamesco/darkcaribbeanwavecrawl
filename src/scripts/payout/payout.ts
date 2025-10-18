export interface PayoutAccount {
  holder: Actor
  amount: number
}

interface Payout {
  accounts: Record<string, PayoutAccount>
  perShare: number
  total: number
  remaining: number
}

export default Payout
