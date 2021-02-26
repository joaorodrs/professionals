import express from 'express'

import { ProfessionalType } from './controllers/ProfessionalType.js'
const professionalType = new ProfessionalType()

export const router = express.Router()

router.post('/professional-type', professionalType.create)