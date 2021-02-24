import path from 'path'
import url from 'url'

const fileURLToPath = url.fileURLToPath
const dirname = path.dirname

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'src', 'database', 'dev.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds')
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'src', 'database', 'test.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds')
    }
  }
}
