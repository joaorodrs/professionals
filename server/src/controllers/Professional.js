import db from '../app/models/index.js'

export class ProfessionalController {
  async create(request, response) {
    const { name, phoneNumber, email, professionalType, situation } = request.body

    if (!name || !email || !professionalType || !situation) {
      return response.status(400).json({ error: 'Insufficient fields' })
    }

    try {
      var professional = await db.Professional.create({
        name,
        phoneNumber,
        email,
        professionalType,
        situation
      })
    } catch(err) {
      return response.status(500).json({ error: err })
    }

    return response.status(201).json({
      success: 'Professional created',
      data: professional
    })
  }

  async index(request, response) {
    try {
      const professionals = await db.Professional.findAll()

      return response.status(200).json(professionals)
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async update(request, response) {
    const { name, phoneNumber, email, professionalType, situation } = request.body
    const { id } = request.headers

    if (!name || !email || !professionalType || !situation) {
      return response.status(400).json({ error: 'Insufficient fields' })
    }

    try {
      await db.Professional.update({
        name,
        phoneNumber,
        email,
        professionalType,
        situation
      }, { where: { id } })
    } catch(err) {
      return response.status(500).json({ error: err })
    }

    return response.status(200).json({
      success: 'Professional updated',
    })
  }
}