import express from 'express'

import { ProfessionalTypeController } from './controllers/ProfessionalTypeController.js'
const professionalType = new ProfessionalTypeController()

import { ProfessionalController } from './controllers/Professional.js'
const professional = new ProfessionalController()

export const router = express.Router()

router.post('/professional-type', professionalType.create)
router.get('/professional-type/', professionalType.index)
router.put('/professional-type/:id', professionalType.update)
router.delete('/professional-type/:id', professionalType.delete)

router.get('/professional-type/professionals', professionalType.indexProfessionals)

router.post('/professional', professional.create)
router.get('/professional', professional.index)
router.put('/professional/:id', professional.update)
router.delete('/professional/:id', professional.delete)