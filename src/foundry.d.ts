declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
}

declare class HandlebarsApplication {
  render: (options: boolean) => Promise<HandlebarsApplication>
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
  once: (name: string, callback: () => void) => void
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
  scenes: {
    active?: Scene
  },
  settings: {
    register: (namespace: string, name: string, settings: GameSettings) => void,
    set: <T>(namespace: string, name: string, value: T) => Promise<T>,
    get: <T>(namespace: string, name: string) => T
  },
  time: {
    advance: (seconds: number) => Promise<number>,
    worldTime: number
  }
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
  }
}
