
import knex from 'knex';
import { Configures } from '../../database/databaseKnex';

export default {
  table: 'menu',
  execQuery: knex(Configures),
};