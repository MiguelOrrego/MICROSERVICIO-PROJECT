exports.up = (knex) => knex.schema.alterTable('homework', (table) => {
  table.boolean('withdrawal').defaultTo(false);
});

exports.down = (knex) => knex.schema.alterTable('homework', (table) => {
  table.dropColumn('withdrawal');
});
