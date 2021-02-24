export default {
  development: {
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
      directory: './src/database/migrations'
    }
  }
}
