const log4js = require('log4js');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const HomeworkService = require('../services/HomeworkService');
const HomeworkRegisterSchema = require('../validators/HomeworkRegisterSchema');
const HomeworkImageSchema = require('../validators/HomeworkImageSchema');


class HomeworkController {
  /**
 * @api {POST} /api/project-ms/projects/homework
 * @apiName RegisterHomework
 * @apiGroup Homework
 * @apiDescription  Register homework for projects
 *
 * @apiParam (body) {Object} Project value
 * @apiParamExample {json} Body example:
 * {
    idProject: 41,
    name: 'Local para surtir los uniformes',
    description: 'la tarea fue pensada por un equipo de trabajo....',
    objectives: 'tener beneficios econimicos.....',
    minimal_cost: 200000,
    optimal_cost: 300000,
    typeHomework: 1,
 * }
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async create(req, res, next) {
    const logName = 'Create Homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start HomeworkController.create : params ${JSON.stringify(body)}`);

    try {
      Validator(HomeworkRegisterSchema).validateRequest(body);

      return HomeworkService.createHomework(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  /**
 * @api {GET} /api/project-ms/homework/:id
 * @apiName GetHomework
 * @apiGroup Homework
 * @apiDescription  Get a Homework
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
    const logName = 'GetOne Homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start HomeworkService.getOne : params ${JSON.stringify(params)}`);

    return HomeworkService.getOneHomework(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {DELETE} /api/project-ms/homework/:id
 * @apiName DeleteHomework
 * @apiGroup Homework
 * @apiDescription  Delete Homework by id
 *
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async deleteHomework(req, res, next) {
    const logName = 'delete Homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;
    logger.info(`Start HomeworkService.deleteHomework : param ${JSON.stringify(id)}`);

    return HomeworkService.deleteHomework(id, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
* @api {PUT} /api/project-ms/homework/:id
* @apiName UpdateHomework
* @apiGroup Homework
* @apiDescription  Update a homework
*
* @apiParam (body, params) {Object} Homework value
* @apiParamExample {json} Body example:
* {
*   "idProject": 564,
*   "name": "TAREA",
*   "objectives": "OBJETAR",
*   "description": "DESCRIBIR",
*   "minimal_cost": 600000,
*   "optimal_cost": 1000000,
*   "idTypeHomework": 1
* }
* @apiParam (params) {Param} id
*
* @apiSuccessExample Success Response:
* HTTP/1.1 200
*
* @apiError (400) {null} Error if object param is invalid
* @apiError (500) {Object} Error on internal runtime, should return nothing.
*/
  async updateHomework(req, res, next) {
    const logName = 'Update Homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start HomeworkController.updateHomework: param ${JSON.stringify(params)}`);
    logger.info(`Start HomeworkController.updateHomework: body ${JSON.stringify(body)}`);

    try {
      return HomeworkService.updateHomework(params, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }


  /**
 * @api {GET} /api/project-ms/projects/:id/homework
 * @apiName GetHomeworkByProject
 * @apiGroup Homework
 * @apiDescription  Get a Homework by id Projects
 *
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async getHomeworkProject(req, res, next) {
    const logName = 'getHomeworkProject Homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start HomeworkService.getHomeworkProject : params ${JSON.stringify(params)}`);

    return HomeworkService.getProjectsByHomework(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }


  /**
 * @api {POST} /api/project-ms/homework/image
 * @apiName Save Image
 * @apiGroup Homework
 * @apiDescription  Register Homework by Image
 *
 * @apiParam (body) {Object} Homework value
 * @apiParamExample {json} Body example:
 * {

      "idHomework":1,
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
    const logName = 'Save image for homework :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start HomeworkController.saveImage : params ${JSON.stringify(body)}`);

    try {
      Validator(HomeworkImageSchema).validateRequest(body);

      return HomeworkService.saveImageOfHomework(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  /**
 * @api {PUT} /api/project-ms/homework/process/edition/:id
 * @apiName Update Homework
 * @apiGroup Homework
 * @apiDescription  update process homework by idHomework
 *
 * @apiParam (body,params) {Object} Homework value
 * @apiParamExample {json} Body example:
 * {
 *    launch_at: '2020-03-10 09:37:45.004404-05'
 * }
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async updateHomeworkToEdition(req, res, next) {
    const logName = 'Update Homework To Edition: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start HomeworkController.updateHomeworkToEdition: params ${JSON.stringify(params)}`);
    logger.info(`Start HomeworkController.updateHomeworkToEdition: body ${JSON.stringify(body)}`);

    return HomeworkService.updateHomeworkToEdition(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {PUT} /api/project-ms/homework/process/revision/:id
 * @apiName Update Homework
 * @apiGroup Homework
 * @apiDescription  update process homework by idHomework
 *
 * @apiParam (body,params) {Object} Homework value
 * @apiParamExample {json} Body example:
 * {
 *    launch_at: '2020-03-10 09:37:45.004404-05'
 * }
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async updateHomeworkToRevision(req, res, next) {
    const logName = 'Update Homework To Revision: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start HomeworkController.updateHomeworkToRevision: params ${JSON.stringify(params)}`);
    logger.info(`Start HomeworkController.updateHomeworkToRevision: body ${JSON.stringify(body)}`);

    return HomeworkService.updateHomeworkToRevision(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
 * @api {PUT} /api/project-ms/homework/process/aproved/:id
 * @apiName Update Homework
 * @apiGroup Homework
 * @apiDescription  update process homework by idHomework
 *
 * @apiParam (body,params) {Object} Homework value
 * @apiParamExample {json} Body example:
 * {
 *    launch_at: '2020-03-10 09:37:45.004404-05'
 * }
 * @apiParam (params) {Param} id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */
  async updateHomeworkToAproved(req, res, next) {
    const logName = 'Update Homework To Aproved: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start HomeworkController.updateHomeworkToAproved: params ${JSON.stringify(params)}`);
    logger.info(`Start HomeworkController.updateHomeworkToAproved: body ${JSON.stringify(body)}`);

    return HomeworkService.updateHomeworkToAproved(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  /**
* @api {PUT} /api/project-ms/homework/qualification/:id
* @apiName Update Homework
* @apiGroup Homework
* @apiDescription  update homework qualification by idHomework
*
* @apiParam (body,params) {Object} Homework value
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
  async updateHomeworkQualificationAverage(req, res, next) {
    const logName = 'Update Homework Qualification Average: ';

    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params, body } = req;

    logger.info(`Start HomeworkController.updateHomeworkQualificationAverage: params ${JSON.stringify(params)}`);
    logger.info(`Start HomeworkController.updateHomeworkQualificationAverage: body ${JSON.stringify(body)}`);

    return HomeworkService.updateHomeworkQualificationAverage(params.id, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getHomeworkProjectByIdProcess(req, res, next) {
    const logName = 'getHomeworkProjectByIdProcess:';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcess : params ${JSON.stringify(params)}`);

    return HomeworkService.getHomeworkProjectByIdProcess(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getHomeworkProjectByIdProcessTwo(req, res, next) {
    const logName = 'getHomeworkProjectByIdProcessTwo:';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcessTwo : params ${JSON.stringify(params)}`);

    return HomeworkService.getHomeworkProjectByIdProcessTwo(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async getHomeworkProjectByIdProcessThird(req, res, next) {
    const logName = 'getHomeworkProjectByIdProcessThird:';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;
    logger.info(`Start HomeworkService.getHomeworkProjectByIdProcessThird : params ${JSON.stringify(params)}`);

    return HomeworkService.getHomeworkProjectByIdProcessThird(params, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const homeworkController = new HomeworkController();
module.exports = homeworkController;
