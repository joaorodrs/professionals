import Sequelize from 'sequelize'
import dbConfig from '../../config/config.cjs'

import ProfessionalTypeModel from './ProfessionalType.js'

// const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = dbConfig['development']
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = [
  ProfessionalTypeModel(sequelize, Sequelize)
]

models.forEach(model => {
  db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
