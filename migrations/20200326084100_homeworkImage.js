exports.up = (knex) => knex.schema.alterTable('homeworkImage', (table) => {
  table.dropForeign('idHomework', 'homeworkimage_idhomework_foreign');
  table.integer('idHomework').unsigned()
    .references('id')
    .inTable('homework')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('homeworkImage', (table) => {
  table.dropForeign('idHomework', 'homeworkimage_idhomework_foreign');
  table.integer('idHomework').unsigned()
    .references('id')
    .inTable('homework')
    .alter();
});
