import { Request, Response } from 'express';

import { UserService, authService } from '../service'
import BaseController from './baseController';
import ResponseBuilder from '../../utils/responseBuilder';
import HandleError from '../../lib/handleError';
import { isEmptyData } from '../../utils';

class userController extends BaseController {

  constructor(
    private responseBuilder = new ResponseBuilder(),
    private handleError = new HandleError()
  ){
    super(UserService)
  }

  async findAll(req: Request, res: Response) {

    try {

      let response = await this.service.findAll()
      // let action = req.action

      this.sendSuccessResponse(
        res,
        this.responseBuilder
          .setData(response)
          // .setAction(action)
          .setMessage('User has authority to access this')
          .build()
      );

    } catch (error) {
      this.handleError.sendCatchError(res, error);
    }
  }
  
  async findMe(req: Request, res: Response) {
    
    const username = req.authAccount.username

    try {

      let hasil = await this.service.findOneAccount(username)

      this.sendSuccessResponse(
        res,
        this.responseBuilder
          .setData(hasil)
          .setMessage('User has authority to access this')
          .build()
      );

    } catch (error) {
      this.handleError.sendCatchError(res, error);
    }
  }

  async login(req: Request, res: Response) {

    const username = req.body.username

    try {
      if (!username) {
        this.sendInvalidPayloadResponse(
          res,
          this.responseBuilder
            .setSuccess(false)
            .setMessage('User ID or password must be provided')
            .build()
        );
        return;
      }

      const account = await this.service.findOneAccount(username);
      if (isEmptyData(account)) {
        this.sendNotFoundResponse(
          res,
          this.responseBuilder
            .setSuccess(false)
            .setMessage(`Account ${username} has not registered yet`)
            .build()
        );
        return;
      }

      delete account.password;

      const token = await authService.generateJWToken(req, account);
      
      this.sendSuccessResponse(
        res,
        this.responseBuilder
          .setData({
            token_expired: token.token_expired,
            token_access: token.token_access,
            account : account,
          })
          .setMessage('account login successfully')
          .build()
      );
      return;

    } catch (error) {
      this.handleError.sendCatchError(res, error);
    }
  }
}

export default userController