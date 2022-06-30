exports.up = (knex) => knex.schema.alterTable('deliverieImage', (table) => {
  table.dropForeign('idDeliverie', 'deliverieimage_iddeliverie_foreign');
  table.integer('idDeliverie').unsigned()
    .references('id')
    .inTable('deliverie')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('deliverieImage', (table) => {
  table.dropForeign('idDeliverie', 'deliverieimage_iddeliverie_foreign');
  table.integer('idDeliverie').unsigned()
    .references('id')
    .inTable('deliverie')
    .alter();
});
