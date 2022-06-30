exports.up = (knex) => knex.schema.alterTable('qualificationProject', (table) => {
  table.dropForeign('idProject', 'qualificationproject_idproject_foreign');
  table.integer('idProject').unsigned().references('project.id')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('qualificationProject', (table) => {
  table.dropForeign('idProject', 'qualificationproject_idproject_foreign');
  table.integer('idProject').unsigned().references('project.id')
    .alter();
});
