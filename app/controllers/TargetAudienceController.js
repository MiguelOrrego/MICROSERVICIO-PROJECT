
const TargetAudienceService = require('../services/TargetAudienceService');

class TargetAudienceController {
  async getList(req, res) {
    return TargetAudienceService.getListOfTargetAudiences()
      .then((response) => res.send(response));
  }
}
const targetAudienceController = new TargetAudienceController();
module.exports = targetAudienceController;
