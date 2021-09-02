import { responseBuilder } from '../utils';
import BaseController from '../app/controller/baseController';

export default class HandleError extends BaseController {
  
  constructor() {
    super(arguments);
  }

  sendCatchError(res: any, error: any) {
    const ResponseBuilder = new responseBuilder();

    this.sendInternalServerErrorResponse(
      res,
      ResponseBuilder
        .setStatus(500)
        .setSuccess(false)
        // eslint-disable-next-line no-useless-escape
        .setMessage(error.toString().replace(/\"/gi, ''))
        .build()
    );
    return;
  }
}
