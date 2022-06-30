const DB = require('../utils/DB');

class QualificationHomeworkRepository {
  constructor() {
    this.insertQuialificationHomework = async (quialificationHomerwork) => DB('qualificationHomework')
      .insert(quialificationHomerwork).returning('*');
    this.findQuialificationHomeworkById = async (id) => DB('qualificationHomework')
      .where({ id }).returning('*');
    this.getHomeworkQualificationByUserAndHomework = (idUser, idHomework) => DB('qualificationHomework')
      .select('*').where({ idUser, idHomework });
    this.updateHomeworkQualification = (idQualification, dataHomeworkQualification) => DB('qualificationHomework')
      .where('id', '=', idQualification).update(dataHomeworkQualification).returning('*');
    this.getHomeworkQualificationByHomework = (idHomework) => DB('qualificationHomework')
      .select('*').where('idHomework', '=', idHomework);
  }
}

const qualificationHomeworkRepository = new QualificationHomeworkRepository();
module.exports = qualificationHomeworkRepository;
