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
      table.json("data");
      table.integer("on_date");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("google_users"),
    knex.schema.dropTable("google_data"),
  ]);
};
