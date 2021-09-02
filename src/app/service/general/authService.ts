import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import BaseService from '../baseService';
import csprng from 'csprng';

import { JwtHelper } from '../../../utils';
import { AccountLog } from '../../model';

export default class AuthService extends BaseService {

  constructor(
    private jwtHelper = JwtHelper
    ) {
    super(AccountLog);
  }

  async generateJWToken(req: any, payload: any) {

    try {

      const { table, execQuery } = this.model;

      let salt = csprng(162, 36);
      const expiredToken = moment()
        .add(parseFloat(process.env.JWT_EXPIRATION), 'hours')
        .toDate();
      const accountLogin = {
        ID : uuidv4(),
        account_id: payload.ID,
        salt: salt,
        host: req.get('host'),
        user_agent: req.get('user-agent'),
        login_at: moment().toDate(),
        expired_token: expiredToken
      };

      const response = await execQuery(table)
        .insert(accountLogin)
      
      await execQuery('user').update({salt : salt}).where({ID : payload.ID})

      if (response == 0) {
        payload.token_expired = expiredToken;
        payload.salt = salt;

        return {
          token_expired: expiredToken,
          token_access: this.jwtHelper.createJWT(payload),
        }
      }
      
      throw Error('Fail to insert data');

    } catch (error) {
      throw Error('Fail generating the jwt token');
    }
  }

  async findOneAccountID(ID: any, payload: any) {

    try {

      const { table, execQuery } = this.model;

      const response = await execQuery(table)
        .where({account_id : ID})
        .orderBy('login_at')
      
      throw Error('Fail to insert data');

    } catch (error) {
      throw Error('Fail generating the jwt token');
    }
  }
}
