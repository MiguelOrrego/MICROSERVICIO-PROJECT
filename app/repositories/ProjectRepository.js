const DB = require('../utils/DB');

class ProjectRepositories {
  constructor() {
    this.createProject = (project) => DB('project').insert(project).returning('*');

    this.getOneProject = (idProject) => DB('project').select('project.*', 'targetAudience.name as targetAudience',
      'process.stateName as process').join('targetAudience', function () {
      this.on('project.targetAudience', '=', 'targetAudience.id');
    }).join('process', function () {
      this.on('project.process', '=', 'process.id');
    })
      .where('project.id', '=', idProject);

    this.updateProjectToEdition = (ProjectId, body) => DB('project').where('id', ProjectId)
      .update({ process: 1, launch_at: body.launch_at }).returning('*');

    this.updateProjectToRevision = (idProject, body) => DB('project').where('id', idProject)
      .update({ process: 2, launch_at: body.launch_at }).returning('*');

    this.updateProjectToAproved = (ProjectId, body) => DB('project').where('id', ProjectId)
      .update({ process: 3, launch_at: body.launch_at }).returning('*');

    this.updateProjectToCancel = (ProjectId, body) => DB('project').where('id', ProjectId)
      .update({ process: 4, launch_at: body.launch_at }).returning('*');

    this.updateProjectQualificationAverage = (ProjectId, body) => DB('project').where('id', ProjectId)
      .update({ qualification: body.qualification }).returning('*');

    this.getProcessByIdProject = (ProjectId) => DB('project').select('process').where(ProjectId).first();


    this.updateProject = (ProjectId, dataProject) => DB('project').where('id', ProjectId)
      .update(dataProject).returning('*');


    this.getProjectsByUser = (idUser) => DB('project')
      .select('project.*', 'targetAudience.name as targetAudience',
        'process.stateName as process')
      .join('targetAudience', function () {
        this.on('project.targetAudience', '=', 'targetAudience.id');
      }).join('process', function () {
        this.on('project.process', '=', 'process.id');
      })
      .where('project.idUser', '=', idUser);

    this.getListProjectsWithImage = () => DB('project').select('project.*', 'targetAudience.name as targetAudience',
      'process.stateName as process')
      .join('targetAudience', function () {
        this.on('project.targetAudience', '=', 'targetAudience.id');
      })
      .join('process', function () {
        this.on('project.process', '=', 'process.id');
      });


    this.getListProjectsByIdProcess = () => DB('project')
      .select('project.*', 'targetAudience.name as targetAudience', 'process.stateName as process')
      .join('targetAudience', function () {
        this.on('project.targetAudience', '=', 'targetAudience.id');
      })
      .join('process', function () {
        this.on('project.process', '=', 'process.id');
      })
      .where({ process: 2 });

    this.getListProjectsByIdProcessTwo = () => DB('project')
      .select('project.*', 'targetAudience.name as targetAudience', 'process.stateName as process')
      .join('targetAudience', function () {
        this.on('project.targetAudience', '=', 'targetAudience.id');
      })
      .join('process', function () {
        this.on('project.process', '=', 'process.id');
      })
      .where({ process: 3 });

    this.deleteProject = (idProject) => DB('project').where('id', idProject).del().returning('*');

    this.saveImageOfProject = (projectImage) => DB('projectImage').insert(projectImage).returning('*');
  }
}

const projectRepositories = new ProjectRepositories();
module.exports = projectRepositories;
