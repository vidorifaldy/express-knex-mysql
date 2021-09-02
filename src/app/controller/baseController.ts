export default class BaseController {
  
  service: any;

  constructor(service: any) {
    this.service = service;
  }

  sendSuccessResponse(res: any, response_body = {}) {
    res.status(200).json(response_body);
  }

  sendCreatedResponse(res: any, response_body = {}) {
    res.status(201).json(response_body);
  }

  sendNotFoundResponse(res: any, response_body = {}) {
    res.status(404).json(response_body);
  }

  sendInvalidPayloadResponse(res: any, response_body = {}) {
    res.status(422).json(response_body);
  }

  sendResourceAlreadyExistResponse(res: any, response_body = {}) {
    res.status(409).json(response_body);
  }

  sendInternalServerErrorResponse(res: any, response_body = {}) {
    res.status(500).json(response_body);
  }

  sendBadRequestResponse(res: any, response_body = {}) {
    res.status(400).json(response_body);
  }
}
