const Promise = require('bluebird');
const log4js = require('../utils/logger');
const HomeworkRepository = require('../repositories/HomeworkRepository');
const HomeworkImageRepository = require('../repositories/HomeworkImageRepository');

const defaultLogger = log4js.getLogger('HomeworkService');

class HomeworkService {
  async createHomework(homework, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.createHomework: params ${JSON.stringify(homework)}`);
    const [res] = await HomeworkRepository.createHomework(homework);

    return res;
  }

  async getOneHomework(idHomework, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.getOneHomework: params ${JSON.stringify(idHomework)}`);

    return HomeworkRepository.getOneHomework(idHomework.id);
  }

  async getProjectsByHomework(idProject, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.getHomeworkByProject: params ${JSON.stringify(idProject)}`);
    const homework = HomeworkRepository.getHomeworksByProject(idProject.id);

    const homeworkByProject = await Promise.mapSeries(homework, async (homeworks) => {
      const images = await HomeworkImageRepository.getImageByIdHomework(homeworks.id);
      const imagesHomework = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);

      return { homeworks, imagesHomework };
    });

    return homeworkByProject;
  }

  async updateHomeworkToEdition(idHomework, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start HomeworkService.updateHomeworkToEdition: params ${JSON.stringify(idHomework)}`);
    logger.info(`Start HomeworkService.updateHomeworkToEdition: body ${JSON.stringify(body)}`);

    const [homework] = await HomeworkRepository.updateHomeworkToEdition(idHomework, body);

    return homework;
  }

  async updateHomeworkToRevision(idHomework, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start HomeworkService.updateHomeworkToRevision: params ${JSON.stringify(idHomework)}`);
    logger.info(`Start HomeworkService.updateHomeworkToRevision: body ${JSON.stringify(body)}`);

    const [homework] = await HomeworkRepository.updateHomeworkToRevision(idHomework, body);

    return homework;
  }

  async updateHomeworkToAproved(idHomework, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start HomeworkService.updateHomeworkToAproved: params ${JSON.stringify(idHomework)}`);
    logger.info(`Start HomeworkService.updateHomeworkToAproved: body ${JSON.stringify(body)}`);

    const [homework] = await HomeworkRepository.updateHomeworkToAproved(idHomework, body);

    return homework;
  }

  async updateHomeworkQualificationAverage(idHomework, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start HomeworkService.updateHomeworkQualificationAverage: params ${JSON.stringify(idHomework)}`);
    logger.info(`Start HomeworkService.updateHomeworkQualificationAverage: body ${JSON.stringify(body)}`);

    const [homework] = await HomeworkRepository.updateHomeworkQualificationAverage(idHomework, body);

    return homework;
  }

  async getHomeworkProjectByIdProcess(idProject, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcess: params ${JSON.stringify(idProject)}`);
    const homework = HomeworkRepository.getHomeworksByIdProcessHomework(idProject.id);

    const homeworkByProject = await Promise.mapSeries(homework, async (homeworks) => {
      const images = await HomeworkImageRepository.getImageByIdHomework(homeworks.id);
      const imagesHomework = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);

      return { homeworks, imagesHomework };
    });

    return homeworkByProject;
  }

  async getHomeworkProjectByIdProcessTwo(idProject, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcessTwo: params ${JSON.stringify(idProject)}`);
    const homework = HomeworkRepository.getHomeworkProjectByIdProcessTwo(idProject.id);

    const homeworkByProject = await Promise.mapSeries(homework, async (homeworks) => {
      const images = await HomeworkImageRepository.getImageByIdHomework(homeworks.id);
      const imagesHomework = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);

      return { homeworks, imagesHomework };
    });

    return homeworkByProject;
  }

  async getHomeworkProjectByIdProcessThird(idProject, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcessThird: params ${JSON.stringify(idProject)}`);
    const homework = HomeworkRepository.getHomeworkProjectByIdProcessThird(idProject.id);

    const homeworkByProject = await Promise.mapSeries(homework, async (homeworks) => {
      const images = await HomeworkImageRepository.getImageByIdHomework(homeworks.id);
      const imagesHomework = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);

      return { homeworks, imagesHomework };
    });

    return homeworkByProject;
  }

  async updateHomework(id, body, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.updateHomework: param ${JSON.stringify(id)}`);
    logger.info(`Start HomeworkService.updateHomework: body ${JSON.stringify(body)}`);

    return HomeworkRepository.updateHomework(id, body);
  }

  async deleteHomework(id, option) {
    const { logger = defaultLogger } = option;
    logger.info(`Start HomeworkService.deleteHomework: param ${JSON.stringify(id)}`);

    return HomeworkRepository.deleteHomework(id);
  }

  async saveImageOfHomework(homeworkImages, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start HomeworkService.saveImageOfHomework: params ${JSON.stringify(homeworkImages)}`);
    await homeworkImages.urlPhoto.forEach(async (image) => {
      await HomeworkRepository.saveImageOfHomework({ idHomework: homeworkImages.idHomework, urlPhoto: image });
    });

    return homeworkImages;
  }
}

const homeworkService = new HomeworkService();
module.exports = homeworkService;
