declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
  close: (options?: any) => Promise<ApplicationV2>
  _onRender(context: any, options: any): Promise<void>
  _onClose(options: any): void
}

declare class DialogV2 extends ApplicationV2 {
  element: HTMLElement
  constructor(options?: any)
  close: (options?: any) => Promise<DialogV2>
}

declare class Handlebars {
  static registerPartial(id: string, template: string): any
}

declare class HandlebarsApplication extends ApplicationV2 {
  constructor(options?: any)
  dragDrop?: DragDrop[]
  options: any
  element: HTMLElement
  render: (options?: any) => Promise<HandlebarsApplication>
  close(options?: any): Promise<this>
  _prepareTabs: (group: string) => any
}

declare class AudioHelper {
  play(data: { autoplay?: boolean, channel?: string, loop?: boolean, src: string, volume?: number }, options?: any): Promise<any>
}

declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
}

declare class Tabs {
  constructor(config?: any)
  activate(tabName: string, triggerRollback?: boolean): void
  bind(html: HTMLElement): void
  _onClickNav: (event: PointerEvent) => void
}

declare class DragDrop {
  constructor(options?: any)
  bind(options?: any): any
  permissions: {
    dragstart: any,
    drop: any
  }
  callbacks: {
    dragstart: any
    dragover: any
    drop: any
  }
}

declare class TextEditor {
  static getDragEventData(event: DragEvent): any
}

type HandlebarsApplicationMixin = (app: typeof ApplicationV2) => typeof HandlebarsApplication

interface GameSettings {
  name: string
  hint: string
  scope: string
  config: boolean
  type: any
  default: any
}

interface Document {
  id: string
  name: string
  img: string
  getFlag<T>(scope: string, key: string): T
  setFlag<T>(scope: string, key: string, value: T): void
}

interface Actor extends Document {
  type: string
  collections: {
    items: Map<string, { type: string, name: string, [key: string]: any }>
  },
  system: {
    attributes: {
      speed?: {
        value: number
      },
      crew?: {
        min: number,
        max: number,
        value: number
      },
      cargo?: {
        max: number,
        value: number
      }
    },
    silver?: number
  }
  update(data?: object, operation?: any): Promise<any>
}

interface Adventure extends Document {
  flags: any
}

interface Module {
  api: Record<string, Function>
}

interface Scene {
  tokens: {
    find: (callback: (t: Token) => boolean) => Token | undefined
  },
  updateEmbeddedDocuments: (type: string, docs: Array<Record<string, any>>) => Promise<void>
}

interface Token {
  actorId: string
  id: string
  x: number
  y: number
  rotation: number
}

declare const Hooks: {
  on: (name: string, callback: (...args: any[]) => void) => number
  once: (name: string, callback: (...args: any[]) => void) => number
  off: (name: string, fn: number | Function) => void
}

declare const game: {
  i18n: {
    localize: (key: string) => string
  },
  actors: Map<string, Actor>
  modules: Map<string, Module>
  packs: Map<string, any>
  paused: boolean,
  scenes: Map<string, any>,
  settings: {
    register: (namespace: string, name: string, settings: GameSettings) => void,
    set: <T>(namespace: string, name: string, value: T) => Promise<T>,
    get: <T>(namespace: string, name: string) => T
  },
  time: {
    worldTime: number,
    set(time: number, options?: object): Promise<number>,
    advance(delta: number, options?: object): Promise<number>
  },
  user: {
    isGM: boolean
  },
  users: Map<string, any>
}

declare const canvas: {
  scene: Scene
}

declare const foundry: {
  applications: {
    api: {
      ApplicationV2: typeof ApplicationV2,
      DialogV2: typeof DialogV2,
      HandlebarsApplicationMixin: HandlebarsApplicationMixin
    },
    handlebars: {
      getTemplate(path: string, id?: string): Promise<any>
      loadTemplates(paths: string[]): Promise<any>
    },
    ux: {
      DragDrop: typeof DragDrop,
      Tabs: typeof Tabs,
      TextEditor: typeof TextEditor
    }
  },
  audio: {
    AudioHelper: AudioHelper
  },
  documents: {
    ChatMessage: ChatMessage
  }
}

declare function fromUuid(uuid: string): Promise<Document | null>
