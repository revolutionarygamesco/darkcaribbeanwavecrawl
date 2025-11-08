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
  v4: jest.fn(() => '8d8ac610-566d-4ef0-9c22-186b2a5ed793'),
  validate: jest.fn((id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(id)
  })
}))
