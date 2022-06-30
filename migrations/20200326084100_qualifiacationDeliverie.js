exports.up = (knex) => knex.schema.alterTable('qualificationDeliverie', (table) => {
  table.dropForeign('idDeliverie', 'qualificationdeliverie_iddeliverie_foreign');
  table.integer('idDeliverie').unsigned().references('deliverie.id')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('qualificationDeliverie', (table) => {
  table.dropForeign('idDeliverie', 'qualificationdeliverie_iddeliverie_foreign');
  table.integer('idDeliverie').unsigned().references('deliverie.id')
    .alter();
});
