import Sequelize from 'sequelize'
import dbConfig from '../../config/config.cjs'

import ProfessionalTypeModel from './ProfessionalType.js'
import ProfessionalModel from './Professional.js'

const env = process.env.NODE_ENV || 'development'

let config

if (env === 'development') {
  config = dbConfig['development']
} else if (env === 'test') {
  config = dbConfig['test']
} else {
  config = dbConfig['production']
}
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = [
  ProfessionalModel(sequelize, Sequelize),
  ProfessionalTypeModel(sequelize, Sequelize)
]

models.forEach(model => {
  db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
