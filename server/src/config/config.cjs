module.exports = {
  production: {
    "host": "localhost",
    "username": "postgres",
    "password": "postgres",
    "database": "postgres",
    "dialect": "postgres",
    "operatorsAliases": false,
    "logging": false,
    "define": {
      "timestamps": true,
      "underscored": true,
      "underscoredAll": true
    }
  },
  test: {
    "dialect": "sqlite",
    "storage": "./src/database/test.sqlite",
    "logging": false
  },
  development: {
    "dialect": "sqlite",
    "storage": "./src/database/dev.sqlite"
  }
}
