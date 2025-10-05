import { MODULE_ID } from '../settings.ts'
import getPositions from './positions.ts'
import getAssignments from './get.ts'
import setAssignments from './set.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

const getHeight = (): number => Math.floor(window.innerHeight * (2/3))
const getWidth = (): number => Math.floor(window.innerWidth * (1/3))
const getTop = (): number => Math.ceil((window.innerHeight - getHeight()) / 2)
const getLeft = (): number => Math.ceil((window.innerWidth - getWidth()) / 2)

const dropSelector = '.position'

export default class CrewPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  private _unassignHandler: ((event: Event) => Promise<void>) | null = null

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-crew`,
    tag: 'section',
    classes: ['crew-panel'],
    window: {
      resizable: true,
      title: 'Crew Roster'
    },
    position: {
      height: getHeight(),
      width: getWidth(),
      top: getTop(),
      left: getLeft()
    },
    dragDrop: [{ dropSelector }]
  }

  static PARTS = {
    crew: {
      template: `./modules/${MODULE_ID}/templates/crew.hbs`,
      scrollable: ['.crew-positions-page']
    }
  }

  constructor(options = {}) {
    super(options)
    this.dragDrop = this.#createDragDropHandlers()
  }

  async _prepareContext () {
    const positions = await getPositions()
    return { positions }
  }

  async _assign (position: string, actor: string): Promise<void> {
    const assignments = getAssignments()
    if (!(position in assignments)) assignments[position] = []
    if (actor) assignments[position].push(actor)
    await setAssignments(assignments)
  }

  async _unassign (position: string, actor: string): Promise<void> {
    const assignments = getAssignments()
    if (!(position in assignments)) assignments[position] = []
    if (actor) assignments[position] = assignments[position].filter(id => id !== actor)
    await setAssignments(assignments)
  }

  async _clickRemove (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button.remove-crew') as HTMLElement
    if (!button) return

    const position = button.dataset.positionId
    const actor = button.dataset.actorId
    if (!position || !actor) return

    await this._unassign(position, actor)
    await this.render()
  }

  #createDragDropHandlers () {
    return this.options.dragDrop.map((d: DragDrop) => {
      d.permissions = {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this)
      }
      d.callbacks = {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this),
      }

      return new foundry.applications.ux.DragDrop(d)
    })
  }

  async _onRender(_context: any, _options: any) {
    if (!this.dragDrop) return
    this.dragDrop.forEach((d) => d.bind(this.element))

    if (!this._unassignHandler) {
      this._unassignHandler = this._clickRemove.bind(this)
      this.element.addEventListener('click', this._unassignHandler)
    }
  }

  _canDragDrop(_: any) {
    return true
  }

  _canDragStart(_: any) {
    return true
  }

  _onDragStart(event: DragEvent) {
    const id = (event.target as HTMLElement).dataset.entryId
    if (!id || !event.dataTransfer) return
    if ('setData' in event.dataTransfer) event.dataTransfer.setData('text/plain', id)
  }

  _onDragOver(_: DragEvent) {}

  async _onDrop (event: DragEvent): Promise<void> {
    const target = event.target as HTMLElement
    const el = target.closest(dropSelector) as HTMLElement
    if (!el) return

    const id = el.dataset.positionId
    if (!id) return

    const data = foundry.applications.ux.TextEditor.getDragEventData(event)
    if (data.type !== 'Actor') return

    const actor = await fromUuid(data.uuid) as Actor
    if (!actor) return

    await this._assign(id, actor.id)
    await this.render()
  }
}
