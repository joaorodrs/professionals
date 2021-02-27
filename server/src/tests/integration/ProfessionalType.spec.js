import request from 'supertest'
import { app } from '../../app.js'
import db from '../../app/models/index.js'

beforeAll(async () => await db.ProfessionalType.sync({ force: true }))

describe('POST /professional-type', () => {
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
    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data).toHaveProperty('description')
    expect(response.body.data).toHaveProperty('situation')
    expect(response.body.success).toBe('Professional type created')

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

describe('PUT /professional-type', () => {
  it('should update a professional type in the database', async done => {
    const newData = {
      description: 'Not a developer',
      phoneNumber: '5593991384250',
      situation: true
    }
    
    const response = await request(app)
      .put('/professional-type')
      .set('professionDescription', 'Developer')
      .send(newData)
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('description')
    expect(response.body.data).toHaveProperty('situation')
    expect(response.body.success).toBe('Professional type updated')

    done()
  })
})

describe('GET /professional-type', () => {
  it('should return all the professional types', async done => {
    const response = await request(app)
      .get('/professional-type')

    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)

    done()
  })
})