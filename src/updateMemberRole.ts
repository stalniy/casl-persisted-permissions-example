import db from './db';

db('roles')
  .update({
    permissions: JSON.stringify([
      { action: ['read', 'create'], subject: 'Article' },
      { action: ['update', 'delete'], subject: 'Article', conditions: { authorId: '${user.id}'} },
    ])
  })
  .where('name', 'member')
  .then(() => {
    console.log('Permissions of "member" role has been updated');
    return db.destroy();
  })
  .catch(console.error);
