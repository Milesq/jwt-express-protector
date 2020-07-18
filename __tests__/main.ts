import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import createJWTProtector from '../src/createJWTProtector'

dotenv.config()

describe('createJWTProtector', () => {
  let app: express.Application

  const verifyToken = jest.fn((payload: object) => {
    return {
      userName: payload,
      admin: false,
    }
  })

  beforeEach(() => {
    app = express()

    const jwtProtector = createJWTProtector({
      secret: process.env.SECRET,
      verifyToken,
    })

    app.get('/secret', jwtProtector, (req, res) => {
      res.send('content')
    })
  })

  it('verifyToken is called', () => {
    expect(verifyToken).toBeCalled()
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
