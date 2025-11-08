import { jest } from '@jest/globals'

(global as any).game = {
  settings: {
    register: jest.fn(),
    get: jest.fn(),
    set: jest.fn()
  },
  user: {
    isGM: true
  }
};

(global as any).ui = {
  notifications: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
};

(global as any).Hooks = {
  once: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  call: jest.fn(),
  callAll: jest.fn()
};

(global as any).CONFIG = {};

(global as any).foundry = {
  utils: {
    mergeObject: jest.fn()
  }
};

jest.mock('uuid', () => ({
  v4: jest.fn(() => {
    const block = (len: number) => {
      let str: string = ''
      for (let i = 0; i < len; i++) str += Math.floor(Math.random() * 16).toString(16)
      return str
    }
    return [block(8), block(4), block(4), block(4), block(12)].join('-')
  }),
  validate: jest.fn((id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(id)
  })
}))
