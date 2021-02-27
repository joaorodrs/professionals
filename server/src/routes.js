import express from 'express'

import { ProfessionalTypeController } from './controllers/ProfessionalTypeController.js'
const professionalType = new ProfessionalTypeController()

export const router = express.Router()

router.post('/professional-type', professionalType.create)
router.get('/professional-type', professionalType.index)
router.put('/professional-type', professionalType.update)
router.delete('/professional-type', professionalType.delete)