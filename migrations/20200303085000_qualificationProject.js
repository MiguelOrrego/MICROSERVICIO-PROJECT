exports.up = (knex) => knex.schema.createTable('qualificationProject', (table) => {
  table.increments('id');
  table.integer('idUser').notNull();
  table.integer('idProject').unsigned().references('project.id');
  table.float('stars').unsigned().defaultTo(0);
});
exports.down = (knex) => knex.schema.dropTable('qualificationProject');
