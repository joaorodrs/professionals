import db from '../app/models/index.js'

export class ProfessionalTypeController {
  async create(request, response) {
    const { description, phoneNumber, situation } = request.body

    if (!description && !situation) {
      return response.status(400).json({ error: 'Description and situation fields missing' })
    } else if (!description) {
      return response.status(400).json({ error: 'Description field missing' })
    } else if (!situation) {
      return response.status(400).json({ error: 'Situation field missing' })
    }

    await db.ProfessionalType.sync({ force: true })

    const professionalType = await db.ProfessionalType.create({
      description,
      phone_number: phoneNumber,
      situation
    })

    return response.status(201).json({ success: 'Professional type created', data: {
      id: professionalType.id, phoneNumber: professionalType.phone_number, description: professionalType.description, situation: professionalType.situation
    }})
  }

  async index(request, response) {
    const professionalTypes = await db.ProfessionalType.findAll()

    return response.status(200).json(professionalTypes)
  }

  async update(request, response) {
    const { description, phoneNumber, situation } = request.body

    if (!description && !situation) {
      return response.status(400).json({ error: 'Description and situation fields missing' })
    } else if (!description) {
      return response.status(400).json({ error: 'Description field missing' })
    } else if (!situation) {
      return response.status(400).json({ error: 'Situation field missing' })
    }

    await db.ProfessionalType.sync()

    await db.ProfessionalType.update({
      description,
      phone_number: phoneNumber,
      situation
    }, {
      where: {
        description: 'Developer'
      }
    })

    return response.status(200).json({ success: 'Professional type updated', data: { description, phoneNumber, situation }})
  }
}