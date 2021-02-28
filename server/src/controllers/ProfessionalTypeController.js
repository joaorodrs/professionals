import db from '../app/models/index.js'

export class ProfessionalTypeController {
  async create(request, response) {
    const { description, phone_number, situation } = request.body

    if (!description && !situation) {
      return response.status(400).json({ error: 'Description and situation fields missing' })
    } else if (!description) {
      return response.status(400).json({ error: 'Description field missing' })
    } else if (!situation) {
      return response.status(400).json({ error: 'Situation field missing' })
    }

    await db.ProfessionalType.sync()

    try {
      var professionalType = await db.ProfessionalType.create({
        description,
        phone_number,
        situation
      })
    } catch(err) {
      return response.status(500).json({ error: err })
    }
    

    return response.status(201).json({ success: 'Professional type created', data: professionalType})
  }

  async index(request, response) {
    await db.ProfessionalType.sync()

    try {
      const professionalTypes = await db.ProfessionalType.findAll()

      return response.status(200).json(professionalTypes)
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async update(request, response) {
    const { description, phone_number, situation } = request.body
    const { id } = request.headers

    if (!id) {
      return response.status(400).json({ error: 'ID must be given' })
    }

    if (!description && !situation) {
      return response.status(400).json({ error: 'Description and situation fields missing' })
    } else if (!description) {
      return response.status(400).json({ error: 'Description field missing' })
    } else if (!situation) {
      return response.status(400).json({ error: 'Situation field missing' })
    }

    const [ rowsUpdated ] = await db.ProfessionalType.update({
      description,
      phone_number,
      situation
    }, {
      where: {
        id
      }
    })

    return response.status(200).json({ success: 'Professional type updated', data: { rowsUpdated } })
  }

  async delete(request, response) {
    const { id } = request.headers

    if (!id) {
      return response.status(400).json({ error: 'ID must be given' })
    }

    try {
      await db.ProfessionalType.destroy({
        where: {
          id
        }
      })
    } catch(err) {
      return response.status(500).json({ error: err })
    }

    return response.status(200).json({ success: 'Professional type deleted' })
  }
}