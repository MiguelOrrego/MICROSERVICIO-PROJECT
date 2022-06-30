exports.up = (knex) => knex.schema.alterTable('project', (table) => {
  table.double('funding').unsigned().defaultTo(0.0);
  table.boolean('financing').unsigned().defaultTo(false);
});

exports.down = (knex) => knex.schema.alterTable('project', (table) => {
  table.dropColumn('funding');
  table.dropColumn('financing');
});
