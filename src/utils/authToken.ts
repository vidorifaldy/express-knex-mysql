import { AuthService, MenuService } from '../services';
import { isEmptyData, getRouteAccess } from '.';
import ResponseBuilder from './responseBuilder';
import JwtHelper from './jwtHelper';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  const jwtHelper = new JwtHelper();
  const authService = new AuthService();
  const menuService = new MenuService();
  const response = new ResponseBuilder();

  if (typeof authorization === 'undefined' || authorization === '') {
    /** auth token not provided */
    response
      .setStatus(403)
      .setMessage('Authorization header not provided or empty')
      .setSuccess(false)
      .build();
    res.status(403).json(response);
    return;
  }

  try {
    const token = jwtHelper.parseToken(authorization);
    const result = await jwtHelper.verifyJwt(token);
    if (result.name === 'TokenExpiredError' && result.message === 'jwt expired') {
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

    const accountLog = await authService.findAccountLog(req, result.id, result.salt);
    if (isEmptyData(accountLog)) {
      response
        .setStatus(403)
        .setMessage('User has not logged in yet')
        .setSuccess(false)
        .build();
      res.status(403).json(response);
      return;
    }

    if (accountLog.salt !== result.salt) {
      response
        .setStatus(403)
        .setMessage('Invalid token sent')
        .setSuccess(false)
        .build();
      res.status(403).json(response);
      return;
    }

    const routeAccess = getRouteAccess(req);
    const roleMenu = await menuService.findMenuByRole(
      routeAccess.route,
      result.jabatan.id,
      result.group.id,
      routeAccess.action
    );
    if (isEmptyData(roleMenu)) {
      response
        .setStatus(403)
        .setMessage('User has no authority to access this')
        .setSuccess(false)
        .build();
      res.status(403).json(response);
      return;
    }

    delete roleMenu.id;
    req.action = roleMenu;
    req.authAccount = Array.isArray(result) ? result[0] : result;
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
