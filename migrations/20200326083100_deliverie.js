exports.up = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.dropForeign('idHomework', 'deliverie_idhomework_foreign');
  table.integer('idHomework').unsigned().references('homework.id')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.dropForeign('idHomework', 'deliverie_idhomework_foreign');
  table.integer('idHomework').unsigned().references('homework.id').alter();
});
