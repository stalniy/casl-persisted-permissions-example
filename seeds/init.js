
exports.seed = async (knex) => {
  await Promise.all([
    knex('users').del(),
    knex('roles').del()
  ]);

  await knex('roles').insert([
    {
      id: 1,
      name: 'admin',
      permissions: JSON.stringify([{ action: 'manage', subject: 'all' }])
    },
    {
      id: 2,
      name: 'member',
      permissions: JSON.stringify([
        { action: 'read', subject: 'Article' },
        { action: 'manage', subject: 'Article', conditions: { authorId: '${user.id}'} },
      ])
    }
  ]);
  await knex('users').insert([
    { id: 1, email: 'admin@casl.io', password: '123456', roleId: 1 },
    { id: 2, email: 'author@casl.io', password: '123456', roleId: 2 },
  ]);
};
