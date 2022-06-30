const DB = require('../utils/DB');


class TypeHomeworkRepositories {
  constructor() {
    this.getTypeHomeworks = () => DB('typeHomework').select('*');
  }
}
const typeHomeworkRepositories = new TypeHomeworkRepositories();
module.exports = typeHomeworkRepositories;
