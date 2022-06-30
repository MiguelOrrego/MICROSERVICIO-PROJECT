exports.up = (knex) => knex.schema.createTable('typeRewards', (table) => {
  table.increments('id');
  table.string('name').notNull();
}).then(() => knex('typeRewards').insert([
  { name: 'Especie' },
  { name: 'Efectivo' },
]));

exports.down = (knex) => knex.schema.dropTable('typeRewards');
