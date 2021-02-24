import knex from 'knex'
import knexfile from '../../knexfile.js'

export let db = null

if (process.env.NODE_ENV === 'test') {
  db = knex(knexfile.test)
} else if (process.env.NODE_ENV === 'production') {
  db = knex(knexfile.production)
} else {
  db = knex(knexfile.test)
}