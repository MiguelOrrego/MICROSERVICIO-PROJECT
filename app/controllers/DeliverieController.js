const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const deliverieService = require('../services/DeliverieService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const DeliverieRegisterSchema = require('../validators/DeliverieRegisterSchema');
const DeliverieImageSchema = require('../validators/DeliverieImageSchema');

class DeliverieController {
  async create(req, res, next) {
    const logName = 'Create Deliverie: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start DeliverieController.create: body ${JSON.stringify(body)}`);

    try {
      Validator(DeliverieRegisterSchema).validateRequest(body);

      return deliverieService.createDeliverie(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getOneDeliveriesById(req, res, next) {
    const logName = 'Get One Deliveries By Id: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start DeliverieController.getOneDeliveriesById: param ${JSON.stringify(params)}`);

    try {
      return deliverieService.getOneDeliverieById(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async updateDeliverieToEdition(req, res, next) {
    const logName = 'Update Deliverie To Edition: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start DeliverieController.updateDeliverieToEdition: params ${JSON.stringify(params)}`);
    logger.info(`Start DeliverieController.updateDeliverieToEdition: body ${JSON.stringify(body)}`);

    return deliverieService.updateDeliverieToEdition(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateDeliverieToRevision(req, res, next) {
    const logName = 'Update Deliverie To Revision: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start DeliverieController.updateDeliverieToRevision: params ${JSON.stringify(params)}`);
    logger.info(`Start DeliverieController.updateDeliverieToRevision: body ${JSON.stringify(body)}`);

    return deliverieService.updateDeliverieToRevision(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateDeliverieToAproved(req, res, next) {
    const logName = 'Update Deliverie To Aproved: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start DeliverieController.updateDeliverieToAproved: params ${JSON.stringify(params)}`);
    logger.info(`Start DeliverieController.updateDeliverieToAproved: body ${JSON.stringify(body)}`);

    return deliverieService.updateDeliverieToAproved(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateDeliverieToCancel(req, res, next) {
    const logName = 'Update Deliverie To Cancel: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start DeliverieController.updateDeliverieToCancel: params ${JSON.stringify(params)}`);
    logger.info(`Start DeliverieController.updateDeliverieToCancel: body ${JSON.stringify(body)}`);

    return deliverieService.updateDeliverieToCancel(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateDeliverieQualificationAverage(req, res, next) {
    const logName = 'Update Deliverie Qualification Average: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start DeliverieController.updateDeliverieQualificationAverage: params ${JSON.stringify(params)}`);
    logger.info(`Start DeliverieController.updateDeliverieQualificationAverage: body ${JSON.stringify(body)}`);

    return deliverieService.updateDeliverieQualificationAverage(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getDeliveriesByIdProject(req, res, next) {
    const logName = 'Get Deliveries By Id Project: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start DeliverieController.getDeliveriesByIdProject: param ${JSON.stringify(params)}`);

    try {
      return deliverieService.getDeliveriesByIdProject(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getDeliveriesAndHomeworksByIdProject(req, res, next) {
    const logName = 'Get Deliveries And Homeworks By Id Project: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start DeliverieController.getDeliveriesAndHomeworksByIdProject: param ${JSON.stringify(params)}`);

    try {
      return deliverieService.getDeliveriesAndHomeworksByIdProject(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getDeliveriesProcessAndHomeworksByIdProject(req, res, next) {
    const logName = 'getDeliveriesProcessAndHomeworksByIdProject: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { homeworkId, process } = req.params;

    logger.info(`Start DeliverieController.getDeliveriesProcessAndHomeworksByIdProject:
                 params ${JSON.stringify(req.params)}`);

    try {
      return deliverieService.getDeliveriesProcessAndHomeworksById(homeworkId, process, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  /**
 * @api {POST} /api/project-ms/homework/image
 * @apiName Save Image
 * @apiGroup Homework
 * @apiDescription  Register Homework by Image
 *
 * @apiParam (body) {Object} Homework value
 * @apiParamExample {json} Body example:
 * {

      "idDeliverie":1,
      "urlPhoto":"https://res.cloudinary.com/dke0ee8mf/image/upload/v1579709103/mkkez7expfuipbi15y6j.jpg"

 * }
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async saveImage(req, res, next) {
    const logName = 'Save image for Deliverie :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start DeliverieController.saveImage : params ${JSON.stringify(body)}`);

    try {
      Validator(DeliverieImageSchema).validateRequest(body);

      return deliverieService.saveImageOfDeliverie(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }
}

const deliverieController = new DeliverieController();
module.exports = deliverieController;
