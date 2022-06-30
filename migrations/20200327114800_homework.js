exports.up = (knex) => knex.schema.alterTable('homework', (table) => {
  table.timestamp('launch_at', { useTz: true }).defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.alterTable('homework', (table) => {
  table.dropColumn('launch_at');
});
