import dotenv from 'dotenv'

const { parsed: env } = dotenv.config()

describe('dotenv', () => {
  it('secret key exists', () => {
    expect(env.SECRET).toBeDefined()
  })
})
