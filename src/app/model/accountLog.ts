
import knex from 'knex';
import { Configures } from '../../database/databaseKnex';

export default {
  table: 'account_log',
  execQuery: knex(Configures),
};