let path = __dirname;
path = path.split("/src").join("").trim() + "/.env";

require("dotenv").config({ path: path });

const knexSeedMigration = {
	migrations: {
		directory: "./data/migrations",
	},
	seeds: {
		directory: "./data/seeds",
	},
	useNullAsDefault: true,
};

module.exports = {
	development: {
		client: "pg",
		...knexSeedMigration,
		connection: process.env.DATABASE_URL,
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
