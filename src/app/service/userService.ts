import { UserModel } from "../model"
import BaseService from "./baseService";
import { isEmptyData } from "../../utils";

import _ from 'lodash';

class UserService extends BaseService {
  
  constructor() {
    super(UserModel);
  }

  async findAll() {

    const { table, execQuery } = this.model;

    try {

      let result = await execQuery(table)
      
      return result

    } catch (error) {

      throw Error(error.message);
    }
  }

  async findOneAccount(username: String) {

    const { table, execQuery } = this.model;

    try {

      let response = await execQuery(table)
      .select(
        'user.ID',
        'user.username',
        'user.password',
        'user.fullname',
        'user.eMail',
        'user.officeID',
        'user.salt',
        'user.job',
        'office.name as officeName'
      )
      .leftJoin(
        'office', 'office.ID', '=', 'user.officeID'
      )
      .where({username : username})

      if (isEmptyData(response)) {
        return {};
      }

      const data = Array.isArray(response) ? response[0] : response;

      return {
        ID : data.ID,
        username : data.username,
        fullname : data.fullname,
        email : data.eMail,
        salt : data.salt,
        office : {
          officeID : data.officeID,
          officeName : data.officeName
        }
      }

    } catch (error) {

      throw Error(error.message);
    }
  }
  
  async updateLogin(payload: any, ID: String) {

    const { table, execQuery } = this.model;

    try {

      let response = await execQuery(table)
      .update(payload)
      .where({ID : ID})

      if (response == 0) {
        return true
      }
      return false

    } catch (error) {

      throw Error(error.message);
    }
  }
}

export default UserService