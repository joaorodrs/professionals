import request from 'supertest'
import { app } from '../../app.js'

describe('GET /professional', () => {
  it('should return all the professional types in the database', async (done) => {
    const message = 'hello'

    const response = await request(app)
      .get('/professional')
      .send({ message })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe(message)

    done()
  })
})