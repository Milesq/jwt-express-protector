import express from 'express'
import request from 'supertest'
import createJWTProtector from '../src/lib'

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
      secret: 'abc',
      verifyToken,
    })

    app.get('/secret', jwtProtector, (req, res) => {
      res.send('content')
    })
  })

  it('verifyToken is called', () => {
    expect(verifyToken).toBeCalled()
    expect(3).toBe(3)
  })

  it('returns 401 when unauthorized', async () => {
    await request(app).get('/secret').expect(401)
  })

  it('returns 200 when authorized', async () => {
    await request(app)
      .get('/secret')
      .auth('', { type: 'bearer' })
      .expect(200)
  })
})
