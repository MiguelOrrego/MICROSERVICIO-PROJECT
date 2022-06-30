const DB = require('../utils/DB');

class ProjectImageRepositories {
  constructor() {
    this.getProjectsImageByIdProject = (projectId) => DB('project')
      .select('project.*', 'targetAudience.name as targetAudience',
        'process.stateName as process', 'i.idProject', 'i.urlPhoto')
      .join('targetAudience', function () {
        this.on('project.targetAudience', '=', 'targetAudience.id');
      }).join('process', function () {
        this.on('project.process', '=', 'process.id');
      })
      .join('projectImage as i', function () {
        this.on('i.idProject', '=', 'project.id');
      })
      .where('i.idProject', projectId);
    this.getImageByIdProjects = (idProject) => DB('projectImage').where('idProject', idProject);
  }
}

const projectImageRepositories = new ProjectImageRepositories();
module.exports = projectImageRepositories;
