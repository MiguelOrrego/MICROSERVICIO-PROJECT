const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const ProjectService = require('../services/ProjectService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const ProjectRegisterSchema = require('../validators/ProjectRegisterSchema');
const ProjectImageSchema = require('../validators/ProjectImageSchema');

class ProjectController {
  /**
 * @api {POST} /api/project-ms/projects
 * @apiName RegisterProject
 * @apiGroup Project
 * @apiDescription  Register project for entrepreneur
 *
 * @apiParam (body) {Object} Project value
 * @apiParamExample {json} Body example:
 * {
      idUser: 1,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 3,
      qualification: 0,
 * }
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async create(req, res, next) {
    const logName = 'Create Project: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start ProjectsController.create: params ${JSON.stringify(body)}`);

    try {
      Validator(ProjectRegisterSchema).validateRequest(body);

      return ProjectService.createProject(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  /**
 * @api {GET} /api/project-ms/projects/:id
 * @apiName GetProject
 * @apiGroup Project
 * @apiDescription  Get a project
 *
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async getOne(req, res, next) {
    const logName = 'GetOne Project: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start ProjectController.getOne: param ${JSON.stringify(params)} `);

    return ProjectService.getOneProject(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {PUT} /api/project-ms/process/edition/project/:id
 * @apiName UpdateProject
 * @apiGroup Project
 * @apiDescription  update process of project for idProject
 *
 * @apiParam (body,params) {Object} Project value
 * @apiParamExample {json} Body example:
 * {
 *    updated_at: '2020-03-10 09:37:45.004404-05'
 * }
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async updateProjectToEdition(req, res, next) {
    const logName = 'Update Project To Edition: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start ProjectController.updateProjectToEdition: params ${JSON.stringify(params)}`);
    logger.info(`Start ProjectController.updateProjectToEdition: body ${JSON.stringify(body)}`);

    return ProjectService.updateProjectToEdition(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
* @api {PUT} /api/project-ms/process/project/:id
* @apiName UpdateProject
* @apiGroup Project
* @apiDescription  update process of project for idProject
*
* @apiParam (body,params) {Object} Project value
* @apiParamExample {json} Body example:
* {
*    updated_at: '2020-03-10 09:37:45.004404-05'
* }
* @apiParam (params) {Param} id
*
* @apiSuccessExample Success Response:
* HTTP/1.1 200
*
* @apiError (400) {null} Error if object param is invalid
* @apiError (500) {Object} Error on internal runtime, should return nothing.
*/
  async updateProjectToRevision(req, res, next) {
    const logName = 'Update Project To Revision: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start ProjectController.updateProjectToRevision: params ${JSON.stringify(params)}`);
    logger.info(`Start ProjectController.updateProjectToRevision: body ${JSON.stringify(body)}`);

    return ProjectService.updateProjectToRevision(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
* @api {PUT} /api/project-ms/process/aproved/project/:id
* @apiName UpdateProject
* @apiGroup Project
* @apiDescription  update process of project for idProject
*
* @apiParam (body,params) {Object} Project value
* @apiParamExample {json} Body example:
* {
*    updated_at: '2020-03-10 09:37:45.004404-05'
* }
* @apiParam (params) {Param} id
*
* @apiSuccessExample Success Response:
* HTTP/1.1 200
*
* @apiError (400) {null} Error if object param is invalid
* @apiError (500) {Object} Error on internal runtime, should return nothing.
*/
  async updateProjectToAproved(req, res, next) {
    const logName = 'Update Project To Aproved: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start ProjectController.updateProjectToAproved: params ${JSON.stringify(params)}`);
    logger.info(`Start ProjectController.updateProjectToAproved: body ${JSON.stringify(body)}`);

    return ProjectService.updateProjectToAproved(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
* @api {PUT} /api/project-ms/process/cancel/project/:id
* @apiName UpdateProject
* @apiGroup Project
* @apiDescription  update process of project for idProject
*
* @apiParam (body,params) {Object} Project value
* @apiParamExample {json} Body example:
* {
*    updated_at: '2020-03-10 09:37:45.004404-05'
* }
* @apiParam (params) {Param} id
*
* @apiSuccessExample Success Response:
* HTTP/1.1 200
*
* @apiError (400) {null} Error if object param is invalid
* @apiError (500) {Object} Error on internal runtime, should return nothing.
*/
  async updateProjectToCancel(req, res, next) {
    const logName = 'Update Project To Cancel: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start ProjectController.updateProjectToCancel: params ${JSON.stringify(params)}`);
    logger.info(`Start ProjectController.updateProjectToCancel: body ${JSON.stringify(body)}`);

    return ProjectService.updateProjectToCancel(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }


  /**
* @api {PUT} /api/project-ms/project/qualification/:id
* @apiName UpdateProject
* @apiGroup Project
* @apiDescription  update process of project for idProject
*
* @apiParam (body,params) {Object} Project value
* @apiParamExample {json} Body example:
* {
*    qualification: 3.5
* }
* @apiParam (params) {Param} id
*
* @apiSuccessExample Success Response:
* HTTP/1.1 200
*
* @apiError (400) {null} Error if object param is invalid
* @apiError (500) {Object} Error on internal runtime, should return nothing.
*/
  async updateProjectQualificationAverage(req, res, next) {
    const logName = 'Update Project Qualification Average: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start ProjectController.updateProjectQualificationAverage: params ${JSON.stringify(params)}`);
    logger.info(`Start ProjectController.updateProjectQualificationAverage: body ${JSON.stringify(body)}`);

    return ProjectService.updateProjectQualificationAverage(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }


  /**
 * @api {PUT} /api/project-ms/projects/:id
 * @apiName UpdateProject
 * @apiGroup Project
 * @apiDescription  update project for idproject
 *
 * @apiParam (body,params) {Object} Project value
 * @apiParamExample {json} Body example:
 * {
      idUser: 1,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes Para Que Tenga Un Futuro Comprometedor',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 20000000,
      optimal_cost: 40000000,
      location: 'Montenegro,Quindio',
      process: 3,
      qualification: 0,
 * }
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async update(req, res, next) {
    const logName = 'Update Project: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start ProjectController.update: params ${JSON.stringify(params)}`);
    const { body } = req;
    logger.info(`Start ProjectController.update: body ${JSON.stringify(body)}`);

    try {
      return ProjectService.updateProject(params, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  /**
 * @api {GET} /api/project-ms/projects/users/:idUser
 * @apiName GetProjectByUser
 * @apiGroup Project
 * @apiDescription  Get a project by id users
 *
 * @apiParam (params) {Param} idUser
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async getUserProject(req, res, next) {
    const logName = 'Get Projects By User :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { idUser } } = req;
    logger.info(`Start ProjectController.getUserProject: params ${JSON.stringify(idUser)}`);

    return ProjectService.getProjectsByUser(idUser, { logger, log4js })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {GET} /api/project-ms/projects
 * @apiName getListProjectsWithImage
 * @apiGroup Project
 * @apiDescription Get all the projects with url image
 *
 * @apiParam (params) none
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async getListProjectsWithImage(req, res, next) {
    const logName = 'Get List Projects With Image : ';
    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info('Start ProjectController.getListProjectsWithImage');

    return ProjectService.getListProjectsWithImage({ logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }


  /**
 * @api {DELETE} /api/project-ms/projects/:id
 * @apiName DeleteProject
 * @apiGroup Project
 * @apiDescription Delete Projects by id
 *
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async delete(req, res, next) {
    const logName = 'Delete Project : ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start ProjectController.delete : params ${JSON.stringify(params)}`);

    return ProjectService.deleteProject(params, { logger, logName })
      .then((response) => res.send({ response, message: 'Project deleted' }))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {POST} /api/project-ms/projects/image
 * @apiName Save Image
 * @apiGroup Project
 * @apiDescription  Register project by Image
 *
 * @apiParam (body) {Object} Project value
 * @apiParamExample {json} Body example:
 * {

      "idProject":1,
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
    const logName = 'Save Image: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start ProjectsController.saveImage: params ${JSON.stringify(body)}`);

    try {
      Validator(ProjectImageSchema).validate(body);

      return ProjectService.saveImageOfProject(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getListProjectProcessOne(req, res, next) {
    const logName = 'getLisrProjectProcessOne : ';
    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info('Start ProjectController.getLisrProjectProcessOne');

    return ProjectService.getListProjectProcessOne({ logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getListProjectProcessTwo(req, res, next) {
    const logName = 'getListProjectProcessTwo : ';
    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info('Start ProjectController.getListProjectProcessTwo');

    return ProjectService.getListProjectProcessTwo({ logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const projectController = new ProjectController();
module.exports = projectController;
