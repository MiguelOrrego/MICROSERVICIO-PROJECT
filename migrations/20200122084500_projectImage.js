exports.up = (knex) => knex.schema.createTable('projectImage', (table) => {
  table.increments('id');
  table.integer('idProject').unsigned()
    .references('id')
    .inTable('project')
    .onDelete('CASCADE');
  table.string('urlPhoto').notNull();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('projectImage');
