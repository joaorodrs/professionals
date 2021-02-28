import { expect, describe, it } from "@jest/globals"
import request from "supertest"
import { app } from "../../app"

describe('POST /professional', () => {
  it('should create a new professional', async done => {
    const response = await request(app)
      .post('/professional')
    
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Hello World')

    done()
  })
})