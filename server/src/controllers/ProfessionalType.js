import { db as connection } from '../database/connection.js'

export class ProfessionalType {
  async create(request, response) {
    const { description, phoneNumber, situation } = request.body

    if (!description && !situation) {
      return response.status(400).json({ error: 'Description and situation fields missing' })
    } else if (!description) {
      return response.status(400).json({ error: 'Description field missing' })
    } else if (!situation) {
      return response.status(400).json({ error: 'Situation field missing' })
    }

    return response.status(201).json({ success: 'Professional type created', data: {
      description, phoneNumber, situation
    } })
  }
}