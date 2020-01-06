exports.up = function (knex) {
    return knex.schema.createTable('blocks', (table) => {
        table.integer('blockNumber').primary();
        table.string('timestampDate').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blocks');
};
