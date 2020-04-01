import knex from 'knex';
import * as config from '../knexfile';

const env = process.env.NODE_ENV || 'development';
type ENV = keyof typeof config;

export default knex(config[env as ENV] || config.development);
