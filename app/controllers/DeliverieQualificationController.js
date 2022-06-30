const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const deliverieQualificationServices = require('../services/DeliverieQualificationService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const DeliverieQualificationSchema = require('../validators/DeliverieQualificationSchema');

class DeliverieQualificationController {
  async createDeliverieQualification(req, res, next) {
    const logName = 'Create Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start DeliverieQualificationController.createDeliverieQualification: params ${JSON.stringify(body)}`);

    try {
      Validator(DeliverieQualificationSchema).validateRequest(body);

      return deliverieQualificationServices.createDeliverieQualification(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getDeliverieQualificationByUserAndDeliverie(req, res, next) {
    const logName = 'Get Deliverie Qualification By IdUser And IdDeliverie: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idUser } } = req;
    const { params: { idDeliverie } } = req;


    logger.info(`Start DeliverieQualificationController.getDeliverieQualificationByUserAndDeliverie:
     param ${JSON.stringify(idUser)} `);

    logger.info(`Start DeliverieQualificationController.getDeliverieQualificationByUserAndDeliverie:
     param ${JSON.stringify(idDeliverie)} `);

    return deliverieQualificationServices.getDeliverieQualificationByUserAndDeliverie(
      idUser, idDeliverie, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getDeliverieQualificationByDeliverie(req, res, next) {
    const logName = 'Get Deliverie Qualification By IdDeliverie: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idDeliverie } } = req;

    logger.info(`Start DeliverieQualificationController.getDeliverieQualificationByDeliverie:
     param ${JSON.stringify(idDeliverie)} `);

    return deliverieQualificationServices.getDeliverieQualificationByDeliverie(
      idDeliverie, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateDeliverieQualification(req, res, next) {
    const logName = 'Update Deliverie Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;
    logger.info(`Start DeliverieQualificationController.updateDeliverieQualification: params ${JSON.stringify(id)}`);
    const { body } = req;
    logger.info(`Start DeliverieQualificationController.updateDeliverieQualification: params ${JSON.stringify(body)}`);

    return deliverieQualificationServices.updateDeliverieQualification(id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const deliverieQualificationController = new DeliverieQualificationController();
module.exports = deliverieQualificationController;
