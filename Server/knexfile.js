const { DATABASE_URL } = require("./src/configVariables");

const knexSeedMigration = {
	migrations: {
		directory: "./src/data/migrations",
	},
	seeds: {
		directory: "./src/data/seeds",
	},
	useNullAsDefault: true,
};

module.exports = {
	development: {
		client: "pg",
		...knexSeedMigration,
		connection: process.env.DATABASE_URL || DATABASE_URL,
	},

	production: {
		client: "pg",
		...knexSeedMigration,
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10,
		},
	},
};
