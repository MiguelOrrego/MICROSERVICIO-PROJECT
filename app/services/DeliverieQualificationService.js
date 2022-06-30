const log4js = require('../utils/logger');
const DeliverieQualificationRepository = require('../repositories/DeliverieQualificationRepositories');

const defaultLogger = log4js.getLogger('DeliverieQualificationService');

class DeliverieQualificationService {
  async createDeliverieQualification(deliverieQualification, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieQualificationService.createDeliverieQualification: params 
        ${JSON.stringify(deliverieQualification)}`);

    return DeliverieQualificationRepository.createDeliverieQualification(deliverieQualification);
  }


  async getDeliverieQualificationByUserAndDeliverie(idUser, idDeliverie, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start DeliverieQualificationService.getDeliverieQualificationByUserAndDeliverie: params
     ${JSON.stringify(idUser, idDeliverie)}`);

    return DeliverieQualificationRepository.getDeliverieQualificationByUserAndDeliverie(idUser, idDeliverie);
  }


  async getDeliverieQualificationByDeliverie(idDeliverie, option) {
    const { logger = defaultLogger } = option;

    logger.info(`Start DeliverieQualificationService.getDeliverieQualificationByDeliverie: params
     ${JSON.stringify(idDeliverie)}`);

    return DeliverieQualificationRepository.getDeliverieQualificationByDeliverie(idDeliverie);
  }

  async updateDeliverieQualification(idQualification, dataDeliverieQualification, options) {
    const { logger = defaultLogger } = options;


    logger.info(`Start DeliverieQualificationService.updateDeliverieQualification: params
     ${JSON.stringify(idQualification)}`);

    logger.info(`Start DeliverieQualificationService.updateDeliverieQualification: params
     ${JSON.stringify(dataDeliverieQualification)}`);


    return DeliverieQualificationRepository.updateDeliverieQualification(idQualification, dataDeliverieQualification);
  }
}

const deliverieQualificationService = new DeliverieQualificationService();
module.exports = deliverieQualificationService;
