exports.up = (knex) => knex.schema.createTable('qualificationHomework', (table) => {
  table.increments('id');
  table.integer('idUser').notNull();
  table.integer('idHomework').unsigned().references('homework.id');
  table.integer('stars').unsigned().defaultTo(0);
});
exports.down = (knex) => knex.schema.dropTable('qualificationHomework');
