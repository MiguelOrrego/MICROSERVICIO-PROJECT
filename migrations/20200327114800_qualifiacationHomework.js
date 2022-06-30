exports.up = (knex) => knex.schema.alterTable('qualificationHomework', (table) => {
  table.dropForeign('idHomework', 'qualificationhomework_idhomework_foreign');
  table.integer('idHomework').unsigned().references('homework.id')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('qualificationHomework', (table) => {
  table.dropForeign('idHomework', 'qualificationhomework_idhomework_foreign');
  table.integer('idHomework').unsigned().references('homework.id')
    .alter();
});
