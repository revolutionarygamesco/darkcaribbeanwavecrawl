declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
}

declare class HandlebarsApplication {
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

type HandlebarsApplicationMixin = (app: typeof ApplicationV2) => typeof HandlebarsApplication

interface GameSettings {
  name: string
  hint: string
  scope: string
  config: boolean
  type: any
  default: any
}

interface Actor {
  id: string
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
  actors: {
    get: (id: string) => Actor | undefined
  },
  modules: {
    get: (id: string) => Module
  },
  paused: boolean,
  scenes: {
    active?: Scene
  },
  settings: {
    register: (namespace: string, name: string, settings: GameSettings) => void,
    set: <T>(namespace: string, name: string, value: T) => Promise<T>,
    get: <T>(namespace: string, name: string) => T
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
    }
  },
  audio: {
    AudioHelper: AudioHelper
  },
  documents: {
    ChatMessage: ChatMessage
  }
}
