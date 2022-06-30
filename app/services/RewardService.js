const Promise = require('bluebird');
const log4js = require('../utils/logger');

const RewardsRepository = require('../repositories/RewardsRepositories');

const defaultLogger = log4js.getLogger('RewardsService');

class RewardsService {
  async createRewards(rewards, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start RewardsService.createRewards: params ${JSON.stringify(rewards)}`);
    const [res] = await RewardsRepository.createRewards(rewards);

    return res;
  }

  async updateRewards(rewardId, reward, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start RewardsService.createRewagrds: params
       ${JSON.stringify(rewardId)} and ${JSON.stringify(reward)}`);

    return RewardsRepository.updateReward(rewardId, reward);
  }

  async getRewardsById(rewardsId, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start RewardsService.getRewardsById: param ${JSON.stringify(rewardsId)}`);

    return RewardsRepository.getRewardsById(rewardsId);
  }

  async getRewardsByIdProject(projectId, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start RewardsService.getRewardsByIdProject: param ${JSON.stringify(projectId.id)}`);

    const rewards = await RewardsRepository.getRewardsByIdProject(projectId.id);
    console.log(rewards);


    const rewardsAndImage = await Promise.mapSeries(rewards, async (reward) => {
      const images = await RewardsRepository.getImageByIdRewards(reward.id);
      const imagesReward = await Promise.mapSeries(images, async (photo) => photo.urlPhoto);
      const { id, ...rest } = reward;

      return { id, ...rest, imagesReward };
    });

    return rewardsAndImage;
  }

  async saveImageOfReward(rewardImages, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start RewardsService.saveImageOfReward: params ${JSON.stringify(rewardImages)}`);
    await rewardImages.urlPhoto.forEach(async (image) => {
      await RewardsRepository.saveImageOfReward({ idReward: rewardImages.idReward, urlPhoto: image });
    });

    return rewardImages;
  }

  async deleteRewardsById(projectId, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start RewardsService.deleteRewardsById: param ${JSON.stringify(projectId.id)}`);

    return RewardsRepository.deleteRewardsById(projectId.id);
  }
}

const rewardsService = new RewardsService();
module.exports = rewardsService;
