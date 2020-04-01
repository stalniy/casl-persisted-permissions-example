import db from '../db';
import { User } from '../models/User';
import interpolate from '../helpers/interpolate';

export async function findBy(where: Partial<Record<keyof User, any>>): Promise<User | undefined> {
  const { permissions, ...user } = await db<User>('users')
    .innerJoin('roles', 'users.roleId', 'roles.id')
    .select('users.id', 'users.email', 'roles.permissions', { role: 'roles.name' })
    .where(where)
    .first();

  user.permissions = interpolate(permissions, { user });

  return user;
}
