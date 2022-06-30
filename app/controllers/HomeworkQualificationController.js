const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const HomeworkQualificationService = require('../services/HomeworkQualificationService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const HomeworkQualificationSchema = require('../validators/HomeworkQualificationSchema');

class HomeworkQualificationController {
  async create(req, res, next) {
    const logName = 'create Homework Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start HomeworkQualificationController.create: body ${JSON.stringify(body)}`);

    try {
      Validator(HomeworkQualificationSchema).validateRequest(body);

      return HomeworkQualificationService.createQualificationHomework(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getHomeworkQualificationByUserAndHomework(req, res, next) {
    const logName = 'Get Homework Qualification By IdUser And IdHomework: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idUser } } = req;
    const { params: { idHomework } } = req;


    logger.info(`Start HomeworkQualificationController.getHomeworkQualificationByUserAndHomework:
     param ${JSON.stringify(idUser)} `);

    logger.info(`Start HomeworkQualificationController.getHomeworkQualificationByUserAndHomework:
     param ${JSON.stringify(idHomework)} `);

    return HomeworkQualificationService.getHomeworkQualificationByUserAndHomework(
      idUser, idHomework, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateHomeworkQualification(req, res, next) {
    const logName = 'Update Homework Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;
    logger.info(`Start HomeworkQualificationController.updateHomeworkQualification: params ${JSON.stringify(id)}`);
    const { body } = req;
    logger.info(`Start HomeworkQualificationController.updateHomeworkQualification: params ${JSON.stringify(body)}`);

    try {
      Validator(HomeworkQualificationSchema).validateRequest(body);

      return HomeworkQualificationService.updateHomeworkQualification(id, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getHomeworkQualificationByHomework(req, res, next) {
    const logName = 'Get Homework Qualification By IdHomework: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idHomework } } = req;

    logger.info(`Start HomeworkQualificationController.getHomeworkQualificationByHomework:
     param ${JSON.stringify(idHomework)} `);

    return HomeworkQualificationService.getHomeworkQualificationByHomework(
      idHomework, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}
const homeworkQualificationController = new HomeworkQualificationController();
module.exports = homeworkQualificationController;
