
const TargetAudienceRepository = require('../repositories/TargetAudienceRepositories');

class TargetAudienceService {
  async getListOfTargetAudiences() {
    return TargetAudienceRepository.getListOfTargetAudiences();
  }
}

const targetAudienceService = new TargetAudienceService();
module.exports = targetAudienceService;
