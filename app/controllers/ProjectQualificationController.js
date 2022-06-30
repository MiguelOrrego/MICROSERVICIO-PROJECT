const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const projectQualificationService = require('../services/ProjectQualificationService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const ProjectQualificationSchema = require('../validators/ProjectQualificationSchema');

class ProjectQualificationController {
  async createProjectQualification(req, res, next) {
    const logName = 'Create Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start ProjectQualificationController.createProjectQualification: params ${JSON.stringify(body)}`);

    try {
      Validator(ProjectQualificationSchema).validateRequest(body);

      return projectQualificationService.createProjectQualification(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getProjectQualificationByUserAndProject(req, res, next) {
    const logName = 'Get Project Qualification By IdUser And IdProject: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idUser } } = req;
    const { params: { idProject } } = req;


    logger.info(`Start ProjectQualificationController.getProjectQualificationByIdUserAndIdProject:
     param ${JSON.stringify(idUser)} `);

    logger.info(`Start ProjectQualificationController.getProjectQualificationByIdUserAndIdProject:
     param ${JSON.stringify(idProject)} `);

    return projectQualificationService.getProjectQualificationByUserAndProject(
      idUser, idProject, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async updateProjectQualification(req, res, next) {
    const logName = 'Update Project Qualification: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;
    logger.info(`Start ProjectQualificationController.updateProjectQualification: params ${JSON.stringify(id)}`);
    const { body } = req;
    logger.info(`Start ProjectQualificationController.updateProjectQualification: params ${JSON.stringify(body)}`);

    try {
      Validator(ProjectQualificationSchema).validateRequest(body);

      return projectQualificationService.updateProjectQualification(id, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getProjectQualificationByProject(req, res, next) {
    const logName = 'Get Project Qualification By IdProject: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idProject } } = req;

    logger.info(`Start ProjectQualificationController.getProjectQualificationByProject:
     param ${JSON.stringify(idProject)} `);

    return projectQualificationService.getProjectQualificationByProject(
      idProject, { logger, logName },
    )
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const projectQualificationController = new ProjectQualificationController();
module.exports = projectQualificationController;
