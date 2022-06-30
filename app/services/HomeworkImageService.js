const log4js = require('../utils/logger');
const HomeworkImageRepository = require('../repositories/HomeworkImageRepository');

const defaultLogger = log4js.getLogger('Homework Image Service');

class HomeworkImageService {
  async deleteImageHomeworkByIdHomework(id, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start HomeworkImageService.deleteImageHomeworkByIdHomework: param ${JSON.stringify(id)}`);

    return HomeworkImageRepository.deleteImageHomeworkByIdHomework(id);
  }

  async updateHomeworkImageByIdHomework(id, body, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.updateHomeworkImageByIdHomework: param ${JSON.stringify(id)}`);
    logger.info(`Start HomeworkService.updateHomeworkImageByIdHomework: body ${JSON.stringify(body)}`);

    return HomeworkImageRepository.updateImageByIdHomework(id, body);
  }
}

const homeworkImageService = new HomeworkImageService();
module.exports = homeworkImageService;
