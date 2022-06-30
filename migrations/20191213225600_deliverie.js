exports.up = (knex) => knex.schema.createTable('deliverie', (table) => {
  table.increments('id');
  table.integer('idHomework').unsigned().references('homework.id');
  table.text('description').notNull();
  table.integer('qualification').unsigned().defaultTo(0);
});
exports.down = (knex) => knex.schema.dropTable('deliverie');
