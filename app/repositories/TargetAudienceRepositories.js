const DB = require('../utils/DB');


class TargetAudienceRepositories {
  constructor() {
    this.getListOfTargetAudiences = () => DB('targetAudience').select('*');
  }
}
const targetAudienceRepositories = new TargetAudienceRepositories();
module.exports = targetAudienceRepositories;
