// import moment from 'moment';
import ResponseBuilder from './responseBuilder';
import { JwtHelper } from './';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../app/service';

export default async (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  const response = new ResponseBuilder();

  if (authorization === 'undefined' || authorization === '') {
    /** auth token not provided */
    response
      .setStatus(403)
      .setMessage('Authorization header not provided or empty')
      .setSuccess(false)
      .build();
    return;
  }

  try {
    const token = JwtHelper.parseToken(authorization);
    const result = await JwtHelper.verifyJwt(token);
    const saltLogin = await UserService.findOneAccount(result.username);
    
    if (result.name === 'TokenExpiredError' && result.message === 'jwt expired' || result.salt !== saltLogin.salt ) {
      response
        .setStatus(401)
        .setMessage('Session has been expired')
        .setSuccess(false)
        .build();
      res.status(401).json(response);
      return;
    }

    if (result.name === 'JsonWebTokenError' && result.message === 'invalid token') {
      response
        .setStatus(403)
        .setMessage('Invalid format token')
        .setSuccess(false)
        .build();
      res.status(403).json(response);
      return;
    }

     req.authAccount = Array.isArray(result) ? result : result;
  } catch (error) {
    res.status(500).json(
      response
        .setStatus(500)
        .setMessage(error.message)
        .setSuccess(false)
        .build()
    );
    return;
  }

  next();
};
