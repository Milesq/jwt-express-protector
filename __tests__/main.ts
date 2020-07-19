import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import createJWTProtector from '../src/createJWTProtector'

dotenv.config()

describe('createJWTProtector', () => {
  let app: express.Application

  const verifyUser = jest.fn((payload: object) => {
    return {
      userName: payload,
      admin: false,
    }
  })

  beforeEach(() => {
    app = express()

    const jwtProtector = createJWTProtector({
      secret: process.env.SECRET,
      verifyUser,
    })

    app.get('/secret', jwtProtector, (req, res) => {
      res.send('content')
    })
  })

  xit('verifyUser is called', () => {
    expect(verifyUser).toBeCalled()
  })

  it('returns 401 when unauthorized', async () => {
    await request(app).get('/secret').expect(401)
  })

  it('returns 200 when authorized', async () => {
    await request(app)
      .get('/secret')
      .auth(signJWT({ user: 'John' }), { type: 'bearer' })
      .expect(200)
  })
})

function signJWT(payload: object): string {
  return jwt.sign(payload, process.env.SECRET)
}
