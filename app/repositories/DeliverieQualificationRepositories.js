const DB = require('../utils/DB');

class DeliverieQualificationRespositories {
  constructor() {
    this.createDeliverieQualification = (deliverieQualification) => DB('qualificationDeliverie')
      .insert(deliverieQualification).returning('*');

    this.getDeliverieQualificationByUserAndDeliverie = (idUser, idDeliverie) => DB('qualificationDeliverie')
      .select('*').where({ idUser, idDeliverie });

    this.getDeliverieQualificationByDeliverie = (idDeliverie) => DB('qualificationDeliverie')
      .select('*').where('idDeliverie', '=', idDeliverie);

    this.updateDeliverieQualification = (idQualification, dataDeliverieQualification) => DB('qualificationDeliverie')
      .where('id', '=', idQualification).update(dataDeliverieQualification).returning('*');
  }
}

const deliverieQualificationRespositories = new DeliverieQualificationRespositories();
module.exports = deliverieQualificationRespositories;
