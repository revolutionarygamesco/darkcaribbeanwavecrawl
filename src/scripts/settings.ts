export const MODULE_ID = 'revolutionary-darkcaribbean'
export const CRAWL_STATE = 'crawl-state'
export const SAVE_STATE = 'saved-crawl-states'

export const MODULE_SETTINGS = {
  CREW_CONFIG: 'crew-config',
  CREW_CONFIG_PANEL: 'crew-config-panel',
  HISTORICAL: 'historical',
  START_DATE: 'start-date',
  DAYS_SAVED: 'days-saved',
  ROTATION: 'rotation'
} as const

export const DEFAULT_CREW = {
  captain: {
    shares: 2,
    max: 1,
    exempt: true,
    exclusive: true,
    required: true,
    votes: 1
  },
  quartermaster: {
    shares: 2,
    max: 1,
    exempt: false,
    exclusive: true,
    required: true,
    votes: 1
  },
  master: {
    shares: 1.5,
    max: 1,
    exempt: false,
    exclusive: true,
    required: true,
    votes: 1
  },
  bosun: {
    shares: 1.5,
    max: 1,
    exempt: false,
    exclusive: true,
    required: false,
    votes: 1
  },
  gunner: {
    shares: 1.5,
    max: 1,
    exempt: true,
    exclusive: true,
    required: false,
    votes: 1
  },
  carpenter: {
    shares: 1.25,
    max: 1,
    exempt: false,
    exclusive: false,
    required: false,
    votes: 1
  },
  surgeon: {
    shares: 1.25,
    exempt: true,
    exclusive: false,
    required: false,
    votes: 1
  },
  priest: {
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false,
    votes: 1
  },
  sorcerer: {
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false,
    votes: 1
  },
  mate: {
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false,
    votes: 1
  },
  cooper: {
    shares: 1,
    exempt: true,
    required: false,
    votes: 1
  },
  armorer: {
    shares: 1,
    exempt: false,
    required: false,
    votes: 1
  },
  musician: {
    shares: 1,
    exempt: false,
    required: false,
    votes: 1
  },
  sailmaker: {
    shares: 1,
    exempt: true,
    exclusive: true,
    required: false,
    votes: 1
  },
  cook: {
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false,
    votes: 1
  },
  crew: {
    shares: 1,
    exempt: false,
    exclusive: true,
    required: false,
    votes: 1
  },
  land: {
    shares: 0.5,
    exempt: false,
    exclusive: true,
    required: false,
    votes: 0
  }
}
