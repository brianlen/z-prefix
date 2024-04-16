/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  
    return knex.schema.createTable('User', function (table) {
            table.increments('id');
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('username', 255).notNullable();
            table.string('password', 255).notNullable();
        })
        .createTable('Item', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable();
            table.string('item_name', 255).notNullable();
            table.string('description', 255).notNullable();
            table.integer('quantity').notNullable();

            table.foreign('user_id').references('User.id');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('Item')
        .dropTable('User');
};
