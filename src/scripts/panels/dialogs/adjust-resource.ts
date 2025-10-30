import { Provision } from '../../state/state.ts'
import { MODULE_ID } from '../../settings.ts'
import localize from '../../utilities/localize.ts'
import addSilver from '../../state/silver/add.ts'
import addProvisions from '../../state/provisions/add.ts'

const parseResource = (
  coll: HTMLFormControlsCollection,
  field: string,
  fallback: number
): number => {
  const input = coll[field as any] as HTMLInputElement
  const parsed = parseInt(input.value)
  return isNaN(parsed) ? fallback : parsed
}

const adjustResource = async (
  type: Provision | 'silver',
  amount: number,
  onComplete?: () => Promise<void>
): Promise<void> => {
  type === 'silver' ? await addSilver(amount) : await addProvisions(type, amount)
  if (onComplete) await onComplete()
}

const openAdjustResourceDialog = async (
  type: Provision | 'silver',
  onComplete?: () => Promise<void>
): Promise<void> => {
  const prefix = [MODULE_ID, 'ledger-panel', 'adjust'].join('.')
  const name = `adjust-${type}`
  const title = localize(`${prefix}.types.${type}.title`)
  const note = type === 'silver' ? '' : `<p class="note">${localize(`${prefix}.types.${type}.note`)}</p>`

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-adjust-resource`,
    window: { title },
    content: `
        <input type="number" id="${name}" name="${name}" value="0" min="0" />
        ${note}
      `,
    buttons: [
      {
        action: 'add',
        label: localize(`${prefix}.actions.add`),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const amount = parseResource(coll, name, 0)
          return await adjustResource(type, amount, onComplete)
        }
      },
      {
        action: 'sub',
        label: localize(`${prefix}.actions.sub`),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const amount = parseResource(coll, name, 0) * -1
          return await adjustResource(type, amount, onComplete)
        }
      },
      {
        action: 'cancel',
        label: localize(`${prefix}.actions.cancel`),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openAdjustResourceDialog
