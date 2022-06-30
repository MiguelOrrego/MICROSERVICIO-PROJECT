const DB = require('../utils/DB');

class RewardsRespositories {
  constructor() {
    this.createRewards = (rewards) => DB('rewards').insert(rewards).returning('*');

    this.getRewardsById = (rewardsId) => DB('rewards').select('*').where(rewardsId).returning('*');

    this.deleteRewardsById = (rewardsId) => DB('rewards').where({ id: rewardsId }).del().returning('*');

    this.saveImageOfReward = (rewardImage) => DB('rewardImage').insert(rewardImage).returning('*');
    this.getImageByIdRewards = (rewardImage) => DB('rewardImage').where('idReward', rewardImage);
    this.updateReward = (rewardId, reward) => DB('rewards').where(rewardId).update(reward).returning('*');

    this.getRewardsByIdProject = (projectId) => DB('rewards as r').select('r.id',
      'r.description', 'r.price', 't.name as nameTypeRewards')
      .join('typeRewards as t', function () {
        this.on('r.idTypeRewards', '=', 't.id');
      }).where({ idProjects: projectId });
  }
}

const rewardsRespositories = new RewardsRespositories();
module.exports = rewardsRespositories;
