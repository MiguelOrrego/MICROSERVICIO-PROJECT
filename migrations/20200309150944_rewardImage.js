exports.up = (knex) => knex.schema.createTable('rewardImage', (table) => {
  table.increments('id');
  table.integer('idReward').unsigned()
    .references('id')
    .inTable('rewards')
    .onDelete('CASCADE');
  table.string('urlPhoto').notNull();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('rewardImage');
