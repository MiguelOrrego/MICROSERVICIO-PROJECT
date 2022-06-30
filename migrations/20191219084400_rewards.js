exports.up = (knex) => knex.schema.createTable('rewards', (table) => {
  table.increments('id');
  table.integer('idProjects').unsigned().references('id').inTable('project')
    .onDelete('CASCADE');
  table.string('description').notNull();
  table.integer('idTypeRewards').unsigned().references('id').inTable('typeRewards');
  table.double('price');
});

exports.down = (knex) => knex.schema.dropTable('rewards');
