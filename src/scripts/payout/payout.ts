export interface PayoutAccount {
  holder: Actor
  amount: number
}

interface Payout {
  accounts: Record<string, PayoutAccount>
  total: number
  remaining: number
}

export default Payout
