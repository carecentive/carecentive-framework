exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("google_users", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.string("email").notNullable();
      table.string("access_token");
      table.string("id_token", 5000);
      table.string("refresh_token");
      table.timestamps(false, true);
    }),
    knex.schema.createTable("google_data", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.string("datatype").notNullable();
      table.string("format").notNullable();
      table.string("value").notNullable();
      table.json("data");
      table.bigInteger("on_date");
      table.timestamp("added_on").defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("google_users"),
    knex.schema.dropTable("google_data"),
  ]);
};
