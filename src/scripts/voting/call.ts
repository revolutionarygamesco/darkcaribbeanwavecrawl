import openCallVoteDialog from '../panels/dialogs/call-vote.ts'
import getRosterActors from '../state/crew/roster/actors.ts'
import findSize from './find-size.ts'
import marshalVoters from './marshal.ts'
import ids from '../ids.ts'

const organizeVote = async (proposition: string): Promise<void> => {
  const voters = await getRosterActors()
  const size = findSize(voters.length)
  const scene = game.scenes.get(ids.voting[size].scene)

  const prop = scene.drawings.get(ids.voting[size].prop)
  await prop.update({ text: proposition })
  await marshalVoters('undecided', voters, scene.id)

  await scene.activate()
  await scene.view()
}

const callVote = async () => {
  await openCallVoteDialog(organizeVote)
}

export default callVote
