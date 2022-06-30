const DB = require('../utils/DB');

class HomeworkRepositories {
  constructor() {
    this.createHomework = (homework) => DB('homework').insert(homework).returning('*');

    this.getOneHomework = (idHomework) => DB('homework as h').select('h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.id', idHomework);

    this.deleteHomework = (id) => DB('homework').where('id', id).del().returning('*');

    this.updateHomework = (id, homework) => DB('homework').where(id).update(homework).returning('*');

    this.updateHomeworkToEdition = (idHomework, body) => DB('homework').where('id', idHomework)
      .update({ processHomework: 1, launch_at: body.launch_at }).returning('*');

    this.updateHomeworkToRevision = (idHomework, body) => DB('homework').where('id', idHomework)
      .update({ processHomework: 2, launch_at: body.launch_at }).returning('*');

    this.updateHomeworkToAproved = (idHomework, body) => DB('homework').where('id', idHomework)
      .update({ processHomework: 3, launch_at: body.launch_at }).returning('*');

    this.updateHomeworkQualificationAverage = (idHomework, body) => DB('homework').where('id', idHomework)
      .update({ qualification: body.qualification }).returning('*');

    this.getHomeworksByProject = (projectId) => DB('homework as h').select('h.id', 'h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.idProject', projectId);


    this.getHomeworksByIdProcessHomework = (projectId) => DB('homework as h').select('h.id', 'h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost', 'h.created_at', 'h.updated_at', 'h.launch_at',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework', 'h.processHomework', 'h.withdrawal')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.idProject', projectId)
      .andWhere({ processHomework: 1 });

    this.getHomeworkProjectByIdProcessTwo = (projectId) => DB('homework as h').select('h.id', 'h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost', 'h.created_at', 'h.updated_at', 'h.launch_at',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework', 'h.processHomework', 'h.withdrawal')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.idProject', projectId)
      .andWhere({ processHomework: 2 });

    this.getHomeworksByIdProcessHomeworkTwo = (projectId) => DB('homework as h').select('h.id', 'h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework', 'h.withdrawal')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.idProject', projectId)
      .andWhere({ processHomework: 1 });

    this.getHomeworkProjectByIdProcessThird = (projectId) => DB('homework as h').select('h.id', 'h.idProject', 'h.name',
      'h.description', 'h.objectives', 'h.minimal_cost', 'h.created_at', 'h.updated_at', 'h.launch_at',
      'h.optimal_cost', 'h.qualification', 't.name as typeHomework', 'h.processHomework', 'h.withdrawal')
      .join('typeHomework as t', function () {
        this.on('h.idTypeHomework', '=', 't.id');
      }).where('h.idProject', projectId)
      .andWhere({ processHomework: 3 });

    this.saveImageOfHomework = (homeworkImage) => DB('homeworkImage').insert(homeworkImage).returning('*');
  }
}
const homeworkRepositories = new HomeworkRepositories();
module.exports = homeworkRepositories;
