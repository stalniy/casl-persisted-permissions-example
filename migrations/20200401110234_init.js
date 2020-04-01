
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
       table.increments('id');
       table.string('email', 255).notNullable();
       table.string('password', 50).notNullable();
       table.integer('roleId').unsigned().notNullable();

       table.foreign('roleId').references('id').inTable('roles');
    })
    .createTable('articles', (table) => {
       table.increments('id');
       table.string('title', 255).notNullable();
       table.string('description').notNullable();
       table.integer('authorId').unsigned().notNullable();

       table.foreign('authorId').references('id').inTable('users');
    })
    .createTable('roles', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.json('permissions').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable('users')
      .dropTable('articles')
      .dropTable('roles');
};
