exports.up = async function (knex) {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("user", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
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
      table.string("user-id").unsigned().notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE");

    });

  await knex.schema.createTable("ticket-status", table => {
    table.increments("id");
    table.string("state").notNullable().defaultTo("pending");
    table.string("ticket_it").notNullable().references("id").inTable("ticket").onUpdate("CASCADE").onDelete("CASCADE");

  });
  await table.schema.createTable("resolved-tickets", table => {
    table.increments("id");
    table.string("solution").notNullable()
    table.string("ticket_id").notNullable().references("id").inTable("ticket").onDelete("CASCADE").onUpdate("CASCADE");
    table.string("resolved-by").notNullable().references("id").inTable("user").onDelete("CASCADE").onUpdate("CASCADE");

  })

};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user");
  await knex.schema.dropTableIfExists("ticket");
  await knex.schema.dropTableIfExists("ticket-status");
  await knex.schema.dropTableIfExists("resolved-tickets")
};
