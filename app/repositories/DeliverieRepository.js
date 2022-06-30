const DB = require('../utils/DB');

class DeliverieRepositories {
  constructor() {
    this.createDeliverie = async (deliverie) => DB('deliverie').insert(deliverie).returning('*');

    this.findDeliverieById = async (id) => DB('deliverie').where({ id }).first();

    this.getOneDeliverieById = (deliverieId) => DB('deliverie').select('*').where(deliverieId).returning('*');

    this.updateDeliverieToEdition = (idDeliverie, body) => DB('deliverie').where('id', idDeliverie)
      .update({ process: 1, launch_at: body.launch_at }).returning('*');

    this.updateDeliverieToRevision = (idDeliverie, body) => DB('deliverie').where('id', idDeliverie)
      .update({ process: 2, launch_at: body.launch_at }).returning('*');

    this.updateDeliverieToAproved = (idDeliverie, body) => DB('deliverie').where('id', idDeliverie)
      .update({ process: 3, launch_at: body.launch_at }).returning('*');

    this.updateDeliverieToCancel = (idDeliverie, body) => DB('deliverie').where('id', idDeliverie)
      .update({ process: 4, launch_at: body.launch_at }).returning('*');

    this.updateDeliverieQualificationAverage = (idDeliverie, body) => DB('deliverie').where('id', idDeliverie)
      .update({ qualification: body.qualification }).returning('*');

    this.getDeliveriesByIdProject = (projectId) => DB('deliverie AS d')
      .select('d.*')
      .join('homework AS h', 'd.idHomework', 'h.id')
      .join('project AS p', 'h.idProject', 'p.id')
      .where({ 'p.id': projectId })
      .returning('*');

    this.getDeliveriesAndHomeworksByIdProject = (projectId) => DB('deliverie AS d')
      .select('d.*', 'h.*')
      .join('homework AS h', 'd.idHomework', 'h.id')
      .join('project AS p', 'h.idProject', 'p.id')
      .where({ 'p.id': projectId })
      .returning('*');

    this.getDeliveriesByIdHomeworkProcess = (idHomework, process) => DB('deliverie')
      .select('*')
      .where({ idHomework, process });

    this.saveImageOfDeliverie = (deliverieImage) => DB('deliverieImage').insert(deliverieImage).returning('*');

    this.getImageByIdDeliverie = (idDeliverie) => DB('deliverieImage').where('idDeliverie', idDeliverie);
  }
}

const deliverieRepositories = new DeliverieRepositories();
module.exports = deliverieRepositories;
