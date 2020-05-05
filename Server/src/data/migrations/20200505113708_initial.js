exports.up = async function (knex) {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("user", (table) => {
      table.uuid("uuid").defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable()
      table.integer("phone_number")
      table.string("password").notNullable();
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("ticket", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("title").notNullable();
      table.text("description", "longtext");
      table.string("category").notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user");
  await knex.schema.dropTableIfExists("ticket");
};
