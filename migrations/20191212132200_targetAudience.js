exports.up = (knex) => knex.schema.createTable('targetAudience', (table) => {
  table.increments('id');
  table.string('name').notNullable();
}).then(() => knex('targetAudience').insert([
  { name: 'Software Libre' },
  { name: 'Educativo' },
  { name: 'Generar Empleo' },
  { name: 'Solidario' },
  { name: 'Desarrollo Agrorural' },
]));

exports.down = (knex) => knex.schema.dropTable('targetAudience');
