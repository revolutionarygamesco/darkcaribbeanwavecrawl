declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
}

declare class HandlebarsApplication {
  constructor(options?: any)
  dragDrop?: DragDrop[]
  options: any
  element: HTMLElement
  render: (options?: boolean) => Promise<HandlebarsApplication>
  close(options?: any): Promise<this>
  _onRender(context: any, options: any): Promise<void>
}

declare class AudioHelper {
  play(data: { autoplay?: boolean, channel?: string, loop?: boolean, src: string, volume?: number }, options?: any): Promise<any>
}

declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
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
  attributes: {
    speed?: {
      value: number
    },
    crew?: {
      max: number,
      value: number
    },
    cargo?: {
      max: number,
      value: number
    }
  },
  collections: {
    items: Map<string, { type: string, name: string, [key: string]: any }>
  },
  system: {
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
  scenes: {
    active?: Scene
  },
  settings: {
    register: (namespace: string, name: string, settings: GameSettings) => void,
    set: <T>(namespace: string, name: string, value: T) => Promise<T>,
    get: <T>(namespace: string, name: string) => T
  },
  time: {
    set(time: number, options?: object): Promise<number>
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
      HandlebarsApplicationMixin: HandlebarsApplicationMixin
    },
    ux: {
      DragDrop: typeof DragDrop,
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
