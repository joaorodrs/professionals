import { expect } from '@jest/globals'
import request from 'supertest'
import { app } from '../../app.js'
import db from '../../app/models/index.js'

beforeAll(async () => await db.ProfessionalType.sync({ force: true }))

describe('POST /professional-type', () => {
  it('should create a new professional type', async (done) => {
    const data = {
      description: 'Developer',
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
      .put('/professional-type/1')
      .send(newData)
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('rowsUpdated')
    expect(response.body.data.rowsUpdated).toBe(1)
    expect(response.body.success).toBe('Professional type updated')

    done()
  })

  it('should return the professional type updated', async done => {
    const response = await request(app)
      .get('/professional-type')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0]).toHaveProperty('phoneNumber')
    expect(response.body[0]).toHaveProperty('situation')
    expect(response.body[0].description).toBe('Not a developer')
    expect(response.body[0].phoneNumber).toBe('5593991384250')

    done()
  })
})

describe('GET /professional-type', () => {
  it('should return all the professional types (one)', async done => {
    const response = await request(app)
      .get('/professional-type')

    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)

    done()
  })
  
  it('should return all the professional types (two)', async done => {
    await request(app).post('/professional-type').send({
      description: 'Data Science Engineer',
      phoneNumber: '123456789',
      situation: true
    })

    const response = await request(app)
      .get('/professional-type')
    
    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)
    expect(response.body.length).toBe(2)

    done()
  })
})

describe('GET /professional-type/professionals', () => {
  it('should return all the professionals related to the given professional type', async done => {
    const createProfessionalType = await request(app)
      .post('/professional-type')
      .send({
        description: 'Engineer',
        situation: true
      })

    expect(createProfessionalType.status).toBe(201)

    const createProfessional = await request(app)
      .post('/professional')
      .send({
        name: 'José Américo',
        phoneNumber: '123456789',
        email: 'americo-jose@gmail.com',
        professionalType: 'Engineer',
        situation: true
      })

    expect(createProfessional.status).toBe(201)

    const response = await request(app)
      .get('/professional-type/professionals')
      .send({
        professionalType: 'Engineer'
      })

    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)
    expect(response.body.length).toBe(1)

    const deleteProfessionalType = await request(app)
      .delete('/professional-type/3')
    const deleteProfessional = await request(app)
      .delete('/professional/3')

    expect(deleteProfessionalType.status).toBe(200)
    expect(deleteProfessional.status).toBe(200)

    done()
  })

  it('should return an error (400 Bad Request) and an error message', async done => {
    const response = await request(app)
      .get('/professional-type/professionals')
    
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Professional type must be given')

    done()
  })

  it('should return an error (404 Not Found) and an error message', async done => {
    const response = await request(app)
      .get('/professional-type/professionals')
      .send({
        professionalType: 'inexistent_professional_type'
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Professional type does not exists in the database')

    done()
  })
})

describe('DELETE /professional-type', () => {
  it('should delete the professional type with id 1', async done => {
    const response = await request(app)
      .delete('/professional-type/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body.success).toBe('Professional type deleted')

    done()
  })

  it('should return only one professional type (because one was deleted)', async done => {
    const response = await request(app)
      .get('/professional-type')

    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)
    expect(response.body.length).toBe(1)

    done()
  })
})