const log4js = require('../utils/logger');
const ProjectQualificationRepository = require('../repositories/ProjectQualificationRepository');

const defaultLogger = log4js.getLogger('QuialificationHomeworkServices');

class ProjectQualificationServices {
  async createProjectQualification(projectQualification, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectQualificationServices.createProjectQualification: body
       ${JSON.stringify(projectQualification)}`);
    const res = await ProjectQualificationRepository.insertProjectQualification(projectQualification);
    logger.info(`Start ProjectQualificationServices.createProjectQualification: res ${JSON.stringify(res)}`);

    return res;
  }

  async getProjectQualificationByUserAndProject(idUser, idProject, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start ProjectQualificationServices.getInvestmentsbyProjectAndUser: params
     ${JSON.stringify(idUser, idProject)}`);

    return ProjectQualificationRepository.getProjectQualificationByUserAndProject(idUser, idProject);
  }

  async updateProjectQualification(idQualification, dataProjectQualification, options) {
    const { logger = defaultLogger } = options;


    logger.info(`Start ProjectQualificationServices.updateProject: params ${JSON.stringify(idQualification)}`);
    logger.info(`Start ProjectQualificationServices.updateProject: params ${JSON.stringify(dataProjectQualification)}`);


    return ProjectQualificationRepository.updateProjectQualification(idQualification, dataProjectQualification);
  }

  async getProjectQualificationByProject(idProject, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start ProjectQualificationServices.getProjectQualificationByProject: params
     ${JSON.stringify(idProject)}`);

    return ProjectQualificationRepository.getProjectQualificationByProject(idProject);
  }
}

const projectQualificationServices = new ProjectQualificationServices();
module.exports = projectQualificationServices;
