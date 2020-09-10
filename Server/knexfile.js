// const { DATABASE_URL } = require("./src/configVariables.js");
let path = __dirname;
path = path.split("/src").join("").trim() + "/.env";

const dotenv = require("dotenv").config({ path: path });

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
