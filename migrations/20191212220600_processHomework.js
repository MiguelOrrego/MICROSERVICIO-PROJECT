exports.up = (knex) => knex.schema.createTable('processHomework', (table) => {
  table.increments('id');
  table.text('name').notNull();
}).then(() => knex('processHomework').insert([
  { name: 'Edición' },
  { name: 'Revisión' },
  { name: 'Aprobado' },
]));
exports.down = (knex) => knex.schema.dropTable('processHomework');
