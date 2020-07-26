import dotenv from 'dotenv'

dotenv.config()

const { env } = process

describe('dotenv', () => {
  const expectedVars = ['SECRET']

  expectedVars.forEach(variable => {
    it('secret key exists', () => {
      expect(env?.[variable]).toBeDefined()
    })
  })
})
