const TypeHomeworkRepository = require('../repositories/TypeHomeworkRepository');

class TypeHomeworkService {
  async getTypeHomeworks() {
    return TypeHomeworkRepository.getTypeHomeworks();
  }
}

const typeHomeworkService = new TypeHomeworkService();
module.exports = typeHomeworkService;
