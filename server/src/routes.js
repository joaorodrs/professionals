import express from 'express'

export const router = express.Router()

router.get('/professional', (req, res) => {
  const { message } = req.body

  return res.json({ message })
})