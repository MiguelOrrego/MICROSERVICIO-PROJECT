const DB = require('../utils/DB');

class HomeworkImageRepositories {
  constructor() {
    this.getHomeworkImageByIdProject = (homeworkId) => DB('homework')
      .select('homework.*', 'typeHomework.name as nameTypeHomework', 'i.urlPhoto')
      .join('typeHomework', function () {
        this.on('project.idTypeHomework', '=', 'typeHomework.id');
      })
      .join('homeworkImage as i', function () {
        this.on('i.idHomework', '=', 'homework.id');
      })
      .where('i.idHomework', homeworkId);
    this.getImageByIdHomework = (idHomework) => DB('homeworkImage').where('idHomework', idHomework);

    this.updateImageByIdHomework = (id, url) => DB('homeworkImage')
      .where({ idHomework: id, urlPhoto: url.urlPhoto })
      .update({ urlPhoto: url.url }).returning('*');

    this.deleteImageHomeworkByIdHomework = (id) => DB('homeworkImage').where('idHomework', id).del().returning('*');
  }
}

const homeworkImageRepositories = new HomeworkImageRepositories();
module.exports = homeworkImageRepositories;
