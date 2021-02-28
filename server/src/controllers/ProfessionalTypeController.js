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

    await db.ProfessionalType.sync()

    try {
      const professionalType = await db.ProfessionalType.create({
        description,
        phoneNumber,
        situation
      })

      return response.status(201).json({ success: 'Professional type created', data: professionalType})
    } catch(err) {
      return response.status(500).json({ error: err })
    }
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

  async indexProfessionals(request, response) {
    const { professionalType } = request.body

    if (!professionalType) {
      return response.status(400).json({ error: 'Professional type must be given' })
    }

    await db.Professional.sync()
    await db.ProfessionalType.sync()

    try {
      const professionalTypes = await db.ProfessionalType.findAll({
        where: {
          description: professionalType
        }
      })

      if (professionalTypes.length === 0) {
        return response.status(404).json({ error: 'No found professionals' })
      }

      const professionalsWithProfessionalType = await db.Professional.findAll({
        where: {
          professionalType
        }
      })

      return response.status(200).json(professionalsWithProfessionalType)
    } catch(err) {
      return response.status(500).json({ error: err })
    }
  }

  async update(request, response) {
    const { description, phoneNumber, situation } = request.body
    const { id } = request.params

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

    await db.ProfessionalType.sync()

    const [ rowsUpdated ] = await db.ProfessionalType.update({
      description,
      phoneNumber,
      situation
    }, {
      where: {
        id
      }
    })

    return response.status(200).json({ success: 'Professional type updated', data: { rowsUpdated } })
  }

  async delete(request, response) {
    const { id } = request.params

    if (!id) {
      return response.status(400).json({ error: 'ID must be given' })
    }

    await db.ProfessionalType.sync()

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