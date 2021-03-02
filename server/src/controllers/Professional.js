import db from '../app/models/index.js'

export class ProfessionalController {
  async create(request, response) {
    const { name, phoneNumber, email, professionalType, situation } = request.body

    if (!name || !email || !professionalType || situation === null | undefined) {
      return response.status(400).json({ error: 'Insufficient fields' })
    }

    await db.Professional.sync()

    try {
      const professional = await db.Professional.create({
        name,
        phoneNumber,
        email,
        professionalType,
        situation
      })

      return response.status(201).json({
        success: 'Professional created',
        data: professional
      })
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async index(request, response) {
    await db.Professional.sync()

    try {
      const professionals = await db.Professional.findAll()

      return response.status(200).json(professionals)
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async update(request, response) {
    const { name, phoneNumber, email, professionalType, situation } = request.body
    const { id } = request.params

    if (!name || !email || !professionalType || situation === null | undefined) {
      return response.status(400).json({ error: 'Insufficient fields' })
    }

    await db.Professional.sync()

    try {
      await db.Professional.update({
        name,
        phoneNumber,
        email,
        professionalType,
        situation
      }, { where: { id } })

      return response.status(200).json({
        success: 'Professional updated',
      })
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async delete(request, response) {
    const { id } = request.params

    if (!id) {
      return response.status(400).json({ error: 'ID must be given' })
    }

    await db.Professional.sync()

    try {
      await db.Professional.destroy({
        where: {
          id
        }
      })

      return response.status(200).json({ success: 'Professional deleted' })
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }
}