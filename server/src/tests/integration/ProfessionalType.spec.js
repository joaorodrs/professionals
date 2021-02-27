import request from 'supertest'
import { app } from '../../app.js'

describe('POST /professional-type', () => {
  // beforeEach(async () => await connection.migrate.latest())

  // afterEach(async () => await connection.migrate.rollback())

  it('should create a new professional type', async (done) => {
    const data = {
      description: 'Developer',
      phoneNumber: '5593991384250',
      situation: true
    }

    const response = await request(app)
      .post('/professional-type')
      .send(data)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('success')
    expect(response.body).toHaveProperty('data')
    expect(response.body.success).toBe('Professional type created')
    expect(response.body.data).toStrictEqual(data)

    done()
  })

  it('should update an existent professional type', async (done) => {
    const data = {
      description: 'Developer',
      phoneNumber: '5593991384250',
      situation: true
    }

    const newData = {
      description: 'Developer'
    }

    const response = await request(app)
      .post('/professional-type')
      .send(data)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('success')
    expect(response.body).toHaveProperty('data')
    expect(response.body.success).toBe('Professional type created')
    expect(response.body.data).toStrictEqual(data)

    done()
  })

  it('should return an error (400 Bad Request) and "Situation field missing" error message', async done => {
    const response = await request(app)
      .post('/professional-type')
      .send({
        description: 'Developer'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Situation field missing')

    done()
  })

  it('should return an error (400 Bad Request) and "Description field missing" error message', async done => {
    const response = await request(app)
      .post('/professional-type')
      .send({
        situation: true
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Description field missing')

    done()
  })
})