import rollTable from './utilities/roll-table.ts'

const generateInsult = async (): Promise<string> => {
  const adj = await rollTable('insultingAdjectives', { displayChat: false })
  const n = await rollTable('insultingNouns', { displayChat: false })
  const adjective = adj?.name ?? 'scurvy'
  const noun = n?.name ?? 'dog'

  return `${adjective} ${noun}`
}

export default generateInsult
