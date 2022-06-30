exports.up = (knex) => knex.schema.createTable('homeworkImage', (table) => {
  table.increments('id');
  table.integer('idHomework').unsigned()
    .references('id')
    .inTable('homework');
  table.string('urlPhoto').notNull();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('homeworkImage');
