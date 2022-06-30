exports.up = (knex) => knex.schema.alterTable('homework', (table) => {
  table.double('qualification').unsigned().defaultTo(0.0).alter();
});

exports.down = (knex) => knex.schema.alterTable('homework', (table) => {
  table.dropColumn('qualification');
});
