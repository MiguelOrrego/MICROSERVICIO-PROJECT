exports.up = (knex) => knex.schema.createTable('project', (table) => {
  table.increments('id');
  table.integer('idUser').notNull();
  table.string('title').notNull();
  table.string('description').notNull();
  table.string('objectives').notNull();
  table.double('qualification').unsigned().defaultTo(0.0);
  table.integer('targetAudience').unsigned()
    .references('id')
    .inTable('targetAudience');
  table.integer('process').unsigned()
    .references('id')
    .inTable('process');
  table.double('minimal_cost').notNull();
  table.double('optimal_cost').notNull();
  table.string('location').notNull();
  table.timestamp('launch_at', { useTz: true }).defaultTo(knex.fn.now());
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('project');
