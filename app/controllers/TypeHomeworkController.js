
const TypeHomeworkService = require('../services/TypeHomeworkService');

class TypeHomeworkController {
  async getTypeHomeworks(req, res) {
    return TypeHomeworkService.getTypeHomeworks()
      .then((response) => res.send(response));
  }
}
const typeHomeworkController = new TypeHomeworkController();
module.exports = typeHomeworkController;
