exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl
      .string('vin', 256)
      .unique()
      .notNullable()
      .index();
    tbl
      .string('make', 256)
      .notNullable()
      .index();
    tbl
      .string('model', 256)
      .notNullable()
      .index();
    tbl
      .integer('mileage', 256)
      .notNullable();
    tbl
      .string('transmission', 256)
      .index();
    tbl
      .string('title_status', 256)
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
