exports.up = (knex) => knex.schema.createTable('deliverieImage', (table) => {
  table.increments('id');
  table.integer('idDeliverie').unsigned()
    .references('id')
    .inTable('deliverie');
  table.string('urlPhoto').notNull();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('deliverieImage');
