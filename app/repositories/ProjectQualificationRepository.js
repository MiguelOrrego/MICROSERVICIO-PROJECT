const DB = require('../utils/DB');

class ProjectQualificationRepository {
  constructor() {
    this.insertProjectQualification = async (projectQualification) => DB('qualificationProject')
      .insert(projectQualification).returning('*');

    this.getProjectQualificationByUserAndProject = (idUser, idProject) => DB('qualificationProject')
      .select('*').where({ idUser, idProject });

    this.updateProjectQualification = (idQualification, dataProjectQualification) => DB('qualificationProject')
      .where('id', '=', idQualification).update(dataProjectQualification).returning('*');

    this.getProjectQualificationByProject = (idProject) => DB('qualificationProject')
      .select('*').where('idProject', '=', idProject);
  }
}

const projectQualificationRepository = new ProjectQualificationRepository();
module.exports = projectQualificationRepository;
