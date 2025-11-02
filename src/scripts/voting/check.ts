import tokenMovementDataRegionsChanged from '../utilities/token-movement-data-regions-changed.ts'
import countVotes from './count.ts'
import ids from '../ids.ts'

const votingScenes = [
  ids.voting.small.scene,
  ids.voting.medium.scene,
  ids.voting.large.scene
]

const checkVote = async (document: Document, movement: TokenMovementData): Promise<void> => {
  const pid = document.parent?.id
  if (!pid || !votingScenes.includes(pid)) return

  const scene = game.scenes.get(pid)
  if (tokenMovementDataRegionsChanged(scene, movement)) await countVotes(pid)
}

export default checkVote
