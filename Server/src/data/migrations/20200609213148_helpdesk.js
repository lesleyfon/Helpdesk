exports.up = async function (knex) {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("user", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable().unique();
      table.bigInteger("phone_number");
      table.string("password").notNullable();
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user");
};
