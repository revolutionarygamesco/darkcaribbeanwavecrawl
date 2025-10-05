import getSilver from './get.ts'
import getCrewAssignments from '../crew/get.ts'
import countShares from '../crew/count-shares.ts'
import adjustSilver from './adjust.ts'

const payout = async (amount: number = getSilver()): Promise<number> => {
  const crew = getCrewAssignments()
  const { total, shares } = countShares(crew)
  const perShare = Math.floor(amount / total)
  let paidOut = 0

  for (const id in shares) {
    const actor = game.actors.get(id)
    if (!actor?.system?.silver) continue

    const payment = Math.floor(shares[id] * perShare)
    await actor.update({ 'system.silver': actor.system.silver + payment })
    paidOut += payment
  }

  return await adjustSilver(paidOut * -1)
}

export default payout
