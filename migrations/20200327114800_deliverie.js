exports.up = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.integer('process').unsigned()
    .references('id')
    .inTable('process')
    .defaultTo(1);
  table.timestamp('launch_at', { useTz: true }).defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.alterTable('deliverie', (table) => {
  table.dropForeign('process', 'deliverie_process_foreign');
  table.dropColumn('process');
  table.dropColumn('launch_at');
});
