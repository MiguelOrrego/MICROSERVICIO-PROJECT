const log4js = require('../utils/logger');
const logUtils = require('../utils/logUtils');
const Validator = require('../validators/Validator');
const RewardsService = require('../services/RewardService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const RewardsSchema = require('../validators/RewardsSchema');
const RewardsImageSchema = require('../validators/RewardImageSchema');

class RewardsController {
  async createRewards(req, res, next) {
    const logName = 'Create Rewards: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start RewardsController.createRewards: params ${JSON.stringify(body)}`);

    try {
      Validator(RewardsSchema).validateRequest(body);

      return RewardsService.createRewards(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getRewardsById(req, res, next) {
    const logName = 'GetRewardsById: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start RewardsController.getRewardsById: param ${JSON.stringify(params)}`);

    try {
      return RewardsService.getRewardsById(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async getRewardsByIdProject(req, res, next) {
    const logName = 'GetRewardsByIdProject: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start RewardsController.getRewardsByIdProject: param ${JSON.stringify(params)}`);

    try {
      return RewardsService.getRewardsByIdProject(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async saveImageReward(req, res, next) {
    const logName = 'Save image for reward :';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Start RewardsController.saveImageReward : params ${JSON.stringify(body)}`);

    try {
      Validator(RewardsImageSchema).validateRequest(body);

      return RewardsService.saveImageOfReward(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async deleteRewardsById(req, res, next) {
    const logName = 'deleteRewardsById: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params } = req;

    logger.info(`Start RewardsController.deleteRewardsById: param ${JSON.stringify(params)}`);

    try {
      return RewardsService.deleteRewardsById(params, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async updateRewards(req, res, next) {
    const logName = 'Update Rewards: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);

    const { body, params } = req;
    logger.info(`Start RewardsController.updateRewards: params ${JSON.stringify(params)} and ${JSON.stringify(body)}`);

    try {
      Validator(RewardsSchema).validateRequest(body);

      return RewardsService.updateRewards(params, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }
}

const rewardsController = new RewardsController();
module.exports = rewardsController;
