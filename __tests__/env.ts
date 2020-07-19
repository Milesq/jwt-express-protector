import dotenv from 'dotenv'

const { parsed: env } = dotenv.config()

describe('dotenv', () => {
  const expectedVars = ['SECRET']

  expectedVars.forEach(variable => {
    it('secret key exists', () => {
      expect(env?.[variable]).toBeDefined()
    })
  })
})
