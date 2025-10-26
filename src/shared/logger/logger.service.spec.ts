import { AppLogger } from './logger.service'

describe('appLogger', () => {
  it('should be defined', () => {
    expect(new AppLogger()).toBeDefined()
  })
})
