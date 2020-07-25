import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import createJWTProtector from '../src/createJWTProtector'

dotenv.config()

const SECRET = process.env.SECRET || ''

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
      secret: SECRET,
      verifyUser,
    })

    app.get('/secret', jwtProtector, (req, res) => {
      res.send('content')
    })
  })

  it('verifyUser is called', async () => {
    await request(app).get('/secret')
    expect(verifyUser).not.toBeCalled()

    await request(app)
      .get('/secret')
      .auth(signJWT({ user: 'John' }), { type: 'bearer' })
    expect(verifyUser).toBeCalledTimes(1)
  })

  it('returns 401 when unauthorized', async () => {
    await request(app).get('/secret').expect(401)
    await request(app)
      .get('/secret')
      .auth(jwt.sign({ user: 'John' }, 'random letters'), {
        type: 'bearer',
      })
      .expect(401)
    await request(app)
      .get('/secret')
      .auth('notJWT', { type: 'bearer' })
      .expect(401)
  })

  it('returns 200 when authorized', async () => {
    await request(app)
      .get('/secret')
      .auth(signJWT({ user: 'John' }), { type: 'bearer' })
      .expect(200)
  })
})

describe('async createJWTProtector', () => {
  it('req.user is awaited when verifyUser returns Promise', async () => {
    const app = express()

    const verifyUser = jest.fn(() => Promise.resolve({}))

    const jwtProtector = createJWTProtector({
      secret: SECRET,
      verifyUser,
    })

    let req: express.Request

    app.get('/', jwtProtector, (_req, res) => {
      res.send('content')
      req = _req
    })

    await request(app)
      .get('/')
      .auth(signJWT({ user: 'John' }), { type: 'bearer' })
      .expect(200)
    /**
     * verifyUser wasn't called
     */
    expect(verifyUser).toBeCalled()
    // @ts-ignore
    expect(req?.user).not.toBeInstanceOf(Promise)
  })
})

test('createJWTProtector works with default verifyUser', async () => {
  const app = express()

  const jwtProtector = createJWTProtector({
    secret: SECRET,
  })

  let req: express.Request

  app.get('/', jwtProtector, (_req, res) => {
    res.send('content')
    req = _req
  })

  await request(app)
    .get('/')
    .auth(signJWT({ user: 'John' }), { type: 'bearer' })
    .expect(200)

  // @ts-ignore
  expect(req.user?.user).toBe('John')
})

function signJWT(payload: object): string {
  return jwt.sign(payload, SECRET)
}
