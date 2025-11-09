import { Ghost, GhostPatch } from '../state.ts'

const patchGhost = (original: Ghost, patch: GhostPatch): Ghost => {
  return {
    id: patch.id ?? original.id,
    names: {
      haunted: patch.names?.haunted ?? original.names.haunted,
      human: patch.names?.human ?? original.names.human
    },
    actor: patch.actor ?? original.actor,
    notes: patch.notes ?? original.notes,
    status: {
      seen: patch.status?.seen ?? original.status.seen,
      named: patch.status?.named ?? original.status.named
    }
  }
}

export default patchGhost
