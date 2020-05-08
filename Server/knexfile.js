// Update with your config settings.
const pg = require("pg")
const {DB_NAME, DB_PASSWORD, USER} = require("./configVariables");

const connection = {
  database: DB_NAME,
  user: USER,
  password: DB_PASSWORD
};
const knexSeedMigration = {
  migrations: {
    directory: './src/data/migrations'
  },
  seeds: {
    directory: './src/data/seeds'
  },
  useNullAsDefault: true
}

module.exports = {
  development: {
    client: "pg",
    ...knexSeedMigration,
    connection: {
      ...connection,
    },
  },

  production: {
    client: "pg",
    ...knexSeedMigration,
    connection: {
      ...connection
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
