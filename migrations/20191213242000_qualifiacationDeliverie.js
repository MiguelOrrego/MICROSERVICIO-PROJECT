exports.up = (knex) => knex.schema.createTable('qualificationDeliverie', (table) => {
  table.increments('id');
  table.integer('idUser').notNull();
  table.integer('idDeliverie').unsigned().references('deliverie.id');
  table.integer('stars').unsigned().defaultTo(0);
});
exports.down = (knex) => knex.schema.dropTable('qualificationDeliverie');
