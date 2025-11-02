import getCopy from '../../state/get-copy.ts'
import discardProvisions from '../discard.ts'
import setCrawlState from '../../state/set.ts'
import saveCrawlState from '../../state/save.ts'

const checkJettisonedProvisions = async (document: Document): Promise<void> => {
  if (document.type !== 'cargo' || document.name !== 'Provisions') return

  const value: string = document.system?.value ?? '0'
  const match = value.match(/(\d+)s?/)
  if (!match) return

  const parsed = parseInt(match[1])
  const amount = isNaN(parsed) ? 0 : parsed
  if (amount <= 0) return

  const state = await getCopy()
  state.provisions = { ...await discardProvisions(amount, state.provisions), forage: state.provisions.forage }
  await setCrawlState(state)
  await saveCrawlState(state)
}

export default checkJettisonedProvisions
