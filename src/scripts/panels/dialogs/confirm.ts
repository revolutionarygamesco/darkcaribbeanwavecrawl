import { MODULE_ID } from '../../settings.ts'

import localize from '../../utilities/localize.ts'

const openConfirmDialog = async (
  title: string,
  body: string,
  onComplete?: () => Promise<void>
): Promise<void> => {
  const path = [MODULE_ID, 'confirm']

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-confirm`,
    window: { title },
    position: { width: 300 },
    content: `<p>${localize(body)}</p>`,
    buttons: [
      {
        action: 'ok',
        label: localize([...path, 'buttons', 'ok'].join('.')),
        callback: async () => {
          if (onComplete) await onComplete()
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openConfirmDialog
