// Update with your config settings.
const dotenv = require("dotenv");

const connection = {
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
const knexSeedMigration = {
  migrations: {
    directory: './src/data/migrations'
  },
  seeds: {
    directory: './src/data/seeds/dev'
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
