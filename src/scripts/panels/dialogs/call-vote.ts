import { MODULE_ID } from '../../settings.ts'

import localize from '../../utilities/localize.ts'

const openCallVoteDialog = async (
  onComplete?: (proposition: string) => Promise<void>
): Promise<void> => {
  const path = [MODULE_ID, 'call-vote']
  const title = localize([...path, 'title'].join('.'))

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-call-vote`,
    window: { title },
    position: { width: 500 },
    content: `
        <label for="prop">${localize([...path, 'label'].join('.'))}</label>
        <textarea id="prop" name="prop" rows="5"></textarea>
      `,
    buttons: [
      {
        action: 'start',
        label: localize([...path, 'buttons', 'start'].join('.')),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const textarea = (coll as any).prop as HTMLTextAreaElement
          const prop = textarea.value
          if (onComplete) await onComplete(prop)
        }
      },
      {
        action: 'cancel',
        label: localize([...path, 'buttons', 'cancel'].join('.')),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openCallVoteDialog
