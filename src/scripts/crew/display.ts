import CrewPanel from './CrewPanel.ts'

const displayCrewPanel = async (): Promise<void> => {
  const panel = new CrewPanel()
  await panel.render(true)
}

export default displayCrewPanel
