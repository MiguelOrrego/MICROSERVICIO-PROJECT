exports.up = (knex) => knex.schema.createTable('homework', (table) => {
  table.increments('id');
  table.integer('idProject').unsigned()
    .references('project.id').onDelete('CASCADE');
  table.string('name').notNull();
  table.string('description').notNull();
  table.string('objectives').notNull();
  table.double('minimal_cost').notNull();
  table.double('optimal_cost').notNull();
  table.integer('idTypeHomework').unsigned()
    .references('typeHomework.id');
  table.integer('qualification').unsigned().defaultTo(0);
  table.integer('processHomework').unsigned()
    .references('processHomework.id')
    .defaultTo(1);
  table.timestamps(true, true);
});
exports.down = (knex) => knex.schema.dropTable('homework');
