import { VotingSize, VotingChoice, VotingMarshallingZone } from './types.ts'
import getRosterActors from '../state/crew/roster/actors.ts'
import ids from '../ids.ts'

const sRows: [number, number] = [7, 18]
const mRows: [number, number] = [14, 33]
const lRows: [number, number] = [28, 67]

const scales: Record<VotingSize, number> = { large: 30, medium: 60, small: 120 }
const grids: Record<VotingSize, Record<VotingChoice, VotingMarshallingZone>> = {
  small: {
    yea: { columns: [1, 5], rows: sRows },
    undecided: { columns: [8, 12], rows: sRows },
    nay: { columns: [15, 19], rows: sRows }
  },
  medium: {
    yea: { columns: [2, 11], rows: mRows },
    undecided: { columns: [16, 25], rows: mRows },
    nay: { columns: [20, 29], rows: mRows },
  },
  large: {
    yea: { columns: [4, 23], rows: lRows },
    undecided: { columns: [32, 51], rows: lRows },
    nay: { columns: [60, 79], rows: lRows }
  }
}

const findSize = (id: string, crewSize?: number): VotingSize => {
  if (ids.voting.large.scene === id) return 'large'
  if (ids.voting.medium.scene === id) return 'medium'
  if (ids.voting.small.scene === id) return 'small'

  if (crewSize && crewSize > 150) return 'large'
  if (crewSize && crewSize > 50) return 'medium'
  return 'small'
}

const marshalVoters = async (
  area: VotingChoice = 'undecided',
  actors?: Actor[],
  scene?: string
): Promise<void> => {
  const voters = actors ?? await getRosterActors()
  const sceneId = scene ?? foundry.documents.Scene.active.id
  const size = findSize(sceneId, voters.length)
  const scale = scales[size]

  const votingScene = game.scenes.get(sceneId)
  if (!votingScene) return

  const { columns, rows } = grids[size][area]
  let x = columns[0]
  let y = rows[0]
  for (const voter of voters) {
    if (x > columns[1]) { x = columns[0]; y++ }
    if (y > rows[1]) break

    const pos = { x: x * scale, y: y * scale }

    let token = votingScene.tokens.find((t: Token) => t.actorId === voter.id)
    if (token) { await token.update(pos); x++; continue }

    token = await voter.getTokenDocument(pos)
    await votingScene.createEmbeddedDocuments('Token', [token])
    x++
  }
}

export default marshalVoters
