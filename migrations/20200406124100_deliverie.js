exports.up = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.double('qualification').unsigned().defaultTo(0.0).alter();
});

exports.down = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.dropColumn('qualification');
});
