exports.up = (knex) => knex.schema.createTable('process', (table) => {
  table.increments('id');
  table.string('stateName').notNullable();
}).then(() => knex('process').insert([
  { stateName: 'Edición' },
  { stateName: 'Revisión' },
  { stateName: 'Aprobado' },
  { stateName: 'Cancelado' },
]));

exports.down = (knex) => knex.schema.dropTable('process');
