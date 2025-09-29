import mod from './scripts/id.ts'

declare module 'fvtt-types/configuration' {
  namespace Hooks {
    interface HookConfig {
      init: () => void
    }
  }

  interface SettingConfig {
    'revolutionary-darkcaribbean.historical': boolean
    'revolutionary-darkcaribbean.ship': string
  }
}

export {}
