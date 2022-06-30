const log4js = require('../utils/logger');
const HomeworkQualificationRepository = require('../repositories/HomeworkQualificationRepository');

const defaultLogger = log4js.getLogger('QuialificationHomeworkServices');

class HomeworkQualificationServices {
  async createQualificationHomework(quialificationHomework, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start HomeworkQualificationServices.createQualificationHomework: body
       ${JSON.stringify(quialificationHomework)}`);
    const [res] = await HomeworkQualificationRepository.insertQuialificationHomework(quialificationHomework);
    logger.info(`Start HomeworkQualificationServices.createQualificationHomework: res ${JSON.stringify(res)}`);

    return res;
  }

  async getHomeworkQualificationByUserAndHomework(idUser, idHomework, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start HomeworkQualificationServices.getInvestmentsbyProjectAndUser: params
     ${JSON.stringify(idUser, idHomework)}`);

    return HomeworkQualificationRepository.getHomeworkQualificationByUserAndHomework(idUser, idHomework);
  }

  async updateHomeworkQualification(idQualification, dataHomeworkQualification, options) {
    const { logger = defaultLogger } = options;


    logger.info(`Start HomeworkQualificationServices.updateHomeworkQualification: params
     ${JSON.stringify(idQualification)}`);

    logger.info(`Start HomeworkQualificationServices.updateHomeworkQualification: params
     ${JSON.stringify(dataHomeworkQualification)}`);


    return HomeworkQualificationRepository.updateHomeworkQualification(idQualification, dataHomeworkQualification);
  }

  async getHomeworkQualificationByHomework(idHomework, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start HomeworkQualificationServices.getHomeworkQualificationByHomework: params
     ${JSON.stringify(idHomework)}`);

    return HomeworkQualificationRepository.getHomeworkQualificationByHomework(idHomework);
  }
}

const homeworkQualificationServices = new HomeworkQualificationServices();
module.exports = homeworkQualificationServices;
