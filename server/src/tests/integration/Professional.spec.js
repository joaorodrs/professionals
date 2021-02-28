import { expect, describe, it, beforeAll } from "@jest/globals"
import request from "supertest"
import { app } from "../../app"
import db from "../../app/models"

beforeAll(async () => await db.Professional.sync({ force: true }))

describe('POST /professional', () => {
  it('should create a new professional', async done => {
    const response = await request(app)
      .post('/professional')
      .send({
        name: 'João Paulo Alencar Rodrigues',
        phoneNumber: '123456789',
        email: 'jpjoao1001@gmail.com',
        professionalType: 'Developer',
        situation: true
      })
    
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('email')
    expect(response.body.data).toHaveProperty('createdAt')
    expect(response.body.data).toHaveProperty('updatedAt')
    expect(response.body.data).toHaveProperty('id')

    done()
  })

  it('should return an error (400 Bad Request) and a error message', async done => {
    const response = await request(app)
      .post('/professional')
      .send({
        phone_number: '123456789'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')

    done()
  })
})

describe('PUT /professional', () => {
  it('should update a professional in the database', async done => {
    const response = await request(app)
      .put('/professional')
      .send({
        name: 'João Paulo Alencar Rodrigues',
        phoneNumber: 'other_phone_number',
        email: 'jpjoao1001@gmail.com',
        professionalType: 'Developer',
        situation: true
      })
      .set('id', 1)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body.success).toBe('Professional updated')

    done()
  })

  it('should return the professional updated', async done => {
    const response = await request(app)
      .get('/professional')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('phoneNumber')
    expect(response.body[0]).toHaveProperty('professionalType')
    expect(response.body[0]).toHaveProperty('email')
    expect(response.body[0]).toHaveProperty('situation')
    expect(response.body[0].phoneNumber).toBe('other_phone_number')

    done()
  })
})

describe('GET /professional', () => {
  it('should return all the professionals (one)', async done => {
    const response = await request(app)
      .get('/professional')
    
    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)

    done()
  })

  it('should return all the professionals (two)', async done => {
    const postResponse = await request(app).post('/professional').send({
      name: 'Pedro José',
      phoneNumber: '123456789',
      email: 'pedro-email@gmail.com',
      professionalType: 'Marketeer',
      situation: true
    })

    expect(postResponse.status).toBe(201)

    const response = await request(app)
      .get('/professional')
    
    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)
    expect(response.body.length).toBe(2)

    done()
  })
})

describe('DELETE /professional', () => {
  it('should delete the professional with id 1', async done => {
    const response = await request(app)
      .delete('/professional')
      .set('id', 1)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body.success).toBe('Professional deleted')

    done()
  })

  it('should return only one professional (because one was deleted)', async done => {
    const response = await request(app)
      .get('/professional')

    expect(response.status).toBe(200)
    expect(response.body).not.toBe(null)
    expect(response.body.length).toBe(1)

    done()
  })
})