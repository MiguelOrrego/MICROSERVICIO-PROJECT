exports.up = (knex) => knex.schema.createTable('typeHomework', (table) => {
  table.increments('id');
  table.text('name').notNull();
}).then(() => knex('typeHomework').insert([
  { name: 'Infraestructura' },
  { name: 'Servicios' },
]));
exports.down = (knex) => knex.schema.dropTable('typeHomework');
