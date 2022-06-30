const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const HomeworkImageService = require('../services/HomeworkImageService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');

class HomeworkImageController {
  async deleteHomeworImageByIdHomework(req, res, next) {
    const logName = 'delete Homework Image By IdHomework: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;

    logger.info(`Start HomeworkImageController.deleteHomeworImageByIdHomework: param ${JSON.stringify(id)}`);

    try {
      return HomeworkImageService.deleteImageHomeworkByIdHomework(id, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async updateHomeworkImageByIdHomework(req, res, next) {
    const logName = 'Update Homework Image:';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id }, body } = req;

    logger.info(`Start HomeworkController.updateHomeworkImageByIdHomework: param ${JSON.stringify(id)}`);
    logger.info(`Start HomeworkController.updateHomeworkImageByIdHomework: body ${JSON.stringify(body)}`);


    return HomeworkImageService.updateHomeworkImageByIdHomework(id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const homeworkImageController = new HomeworkImageController();
module.exports = homeworkImageController;
