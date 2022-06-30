const Promise = require('bluebird');
const log4js = require('../utils/logger');
const ProjectRepository = require('../repositories/ProjectRepository');
const ProjectsImageRepositories = require('../repositories/ProjectImageRepository');

const defaultLogger = log4js.getLogger('ProjectService');

class ProjectService {
  async createProject(project, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectsService.createProject: params ${JSON.stringify(project)}`);
    const [res] = await ProjectRepository.createProject(project);

    return res;
  }

  async getOneProject(projectId, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectService.getOneProject: param ${JSON.stringify(projectId)}`);

    const projects = ProjectRepository.getOneProject(projectId.id);

    const [projectsOne] = await Promise.mapSeries(projects, async (project) => {
      const images = await ProjectsImageRepositories.getImageByIdProjects(project.id);
      const imagesProject = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);
      const { id, ...rest } = project;

      return { id, ...rest, imagesProject };
    });

    return projectsOne;
  }

  async updateProjectToEdition(idProject, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start ProjectService.updateProjectToEdition: params ${JSON.stringify(idProject)}`);
    logger.info(`Start ProjectService.updateProjectToEdition: body ${JSON.stringify(body)}`);

    const [project] = await ProjectRepository.updateProjectToEdition(idProject, body);

    return project;
  }

  async updateProjectToRevision(idProject, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start ProjectService.updateProjectToRevision: params ${JSON.stringify(idProject)}`);
    logger.info(`Start ProjectService.updateProjectToRevision: body ${JSON.stringify(body)}`);

    const [project] = await ProjectRepository.updateProjectToRevision(idProject, body);

    return project;
  }

  async updateProjectToAproved(idProject, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start ProjectService.updateProjectToAproved: params ${JSON.stringify(idProject)}`);
    logger.info(`Start ProjectService.updateProjectToAproved: body ${JSON.stringify(body)}`);

    const [project] = await ProjectRepository.updateProjectToAproved(idProject, body);

    return project;
  }

  async updateProjectToCancel(idProject, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start ProjectService.updateProjectToCancel: params ${JSON.stringify(idProject)}`);
    logger.info(`Start ProjectService.updateProjectToCancel: body ${JSON.stringify(body)}`);

    const [project] = await ProjectRepository.updateProjectToCancel(idProject, body);

    return project;
  }

  async updateProjectQualificationAverage(idProject, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start ProjectService.updateProjectQualificationAverage: params ${JSON.stringify(idProject)}`);
    logger.info(`Start ProjectService.updateProjectQualificationAverage: body ${JSON.stringify(body)}`);

    const [project] = await ProjectRepository.updateProjectQualificationAverage(idProject, body);

    return project;
  }

  async updateProject(projectId, dataProject, options) {
    const { logger = defaultLogger } = options;


    logger.info(`Start ProjectService.updateProject: params ${JSON.stringify(projectId)}`);
    logger.info(`Start ProjectService.updateProject: body ${JSON.stringify(dataProject)}`);
    const projects = await ProjectRepository.updateProject(projectId.id, dataProject);

    return projects;
  }

  async getProjectsByUser(idUser, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectService.getProjectsByUser: params ${JSON.stringify(idUser)}`);
    const projects = ProjectRepository.getProjectsByUser(idUser);
    const projectsUser = await Promise.mapSeries(projects, async (project) => {
      const images = await ProjectsImageRepositories.getImageByIdProjects(project.id);
      const imagesProject = await Promise.mapSeries(images, async (imagess) => imagess.urlPhoto);
      const { id, ...rest } = project;

      return { id, ...rest, imagesProject };
    });

    return projectsUser;
  }

  async getListProjectsWithImage(options) {
    const { logger = defaultLogger } = options;
    logger.info('Start ProjectService.getListProjectsWithImage');

    const projects = ProjectRepository.getListProjectsWithImage();

    const projectsUser = await Promise.mapSeries(projects, async (project) => {
      const images = await ProjectsImageRepositories.getImageByIdProjects(project.id);

      const imagesProject = await Promise.mapSeries(images, async (imagess) => imagess.urlPhoto);

      const { id, ...rest } = project;

      return { id, ...rest, imagesProject };
    });

    return projectsUser;
  }

  async deleteProject(idProject, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectService.deleteProject : params ${JSON.stringify(idProject)}`);

    const { process } = await ProjectRepository.getProcessByIdProject(idProject);

    if (process === 1) {
      const project = await ProjectRepository.deleteProject(idProject.id);

      return project;
    }


    logger.info(`Start ProjectService.deleteProject : Imposible eliminar ${JSON.stringify(idProject)}`);

    return null;
  }

  async saveImageOfProject(projectImages, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start ProjectsService.saveImageOfProject: params ${JSON.stringify(projectImages)}`);
    await projectImages.urlPhoto.forEach(async (image) => {
      await ProjectRepository.saveImageOfProject({ idProject: projectImages.idProject, urlPhoto: image });
    });

    return projectImages;
  }

  async getListProjectProcessOne(options) {
    const { logger = defaultLogger } = options;
    logger.info('Start ProjectService.getListProjectProcessOne');

    const projects = ProjectRepository.getListProjectsByIdProcess();

    const projectsUser = await Promise.mapSeries(projects, async (project) => {
      const images = await ProjectsImageRepositories.getImageByIdProjects(project.id);

      const imagesProject = await Promise.mapSeries(images, async (imagess) => imagess.urlPhoto);

      const { id, ...rest } = project;

      return { id, ...rest, imagesProject };
    });

    return projectsUser;
  }

  async getListProjectProcessTwo(options) {
    const { logger = defaultLogger } = options;
    logger.info('Start ProjectService.getListProjectProcessTwo');

    const projects = ProjectRepository.getListProjectsByIdProcessTwo();

    const projectsUser = await Promise.mapSeries(projects, async (project) => {
      const images = await ProjectsImageRepositories.getImageByIdProjects(project.id);
      console.log(project);

      const imagesProject = await Promise.mapSeries(images, async (imagess) => imagess.urlPhoto);
      console.log(images);

      const { id, ...rest } = project;

      return { id, ...rest, imagesProject };
    });

    return projectsUser;
  }
}

const projectService = new ProjectService();
module.exports = projectService;
