
import knex from 'knex';
import { Configures } from '../../database/databaseKnex';

export default {
  table: 'user',
  execQuery: knex(Configures),
};