import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.body)

  return res.json({ message: 'Hello World!' })
})