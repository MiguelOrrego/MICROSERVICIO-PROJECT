const Promise = require('bluebird');
const log4js = require('../utils/logger');
const DeliverieRepository = require('../repositories/DeliverieRepository');

const defaultLogger = log4js.getLogger('DeliverieServices');

class DeliverieServices {
  async createDeliverie(deliverie, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start DeliverieServices.createDeliverie: body ${JSON.stringify(deliverie)}`);
    const [res] = await DeliverieRepository.createDeliverie(deliverie);
    logger.info(`Start DeliverieServices.createDeliverie: res ${JSON.stringify(res)}`);

    return res;
  }

  async getOneDeliverieById(deliverieId, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start DeliverieService.getOneDeliverieById: param ${JSON.stringify(deliverieId)}`);

    return DeliverieRepository.getOneDeliverieById(deliverieId);
  }

  async updateDeliverieToEdition(idDeliverie, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.updateDeliverieToEdition: params ${JSON.stringify(idDeliverie)}`);
    logger.info(`Start DeliverieService.updateDeliverieToEdition: body ${JSON.stringify(body)}`);

    const [DELIVERIE] = await DeliverieRepository.updateDeliverieToEdition(idDeliverie, body);

    return DELIVERIE;
  }

  async updateDeliverieToRevision(idDeliverie, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.updateDeliverieToRevision: params ${JSON.stringify(idDeliverie)}`);
    logger.info(`Start DeliverieService.updateDeliverieToRevision: body ${JSON.stringify(body)}`);

    const [DELIVERIE] = await DeliverieRepository.updateDeliverieToRevision(idDeliverie, body);

    return DELIVERIE;
  }

  async updateDeliverieToAproved(idDeliverie, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.updateDeliverieToAproved: params ${JSON.stringify(idDeliverie)}`);
    logger.info(`Start DeliverieService.updateDeliverieToAproved: body ${JSON.stringify(body)}`);

    const [DELIVERIE] = await DeliverieRepository.updateDeliverieToAproved(idDeliverie, body);

    return DELIVERIE;
  }

  async updateDeliverieToCancel(idDeliverie, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.updateDeliverieToCancel: params ${JSON.stringify(idDeliverie)}`);
    logger.info(`Start DeliverieService.updateDeliverieToCancel: body ${JSON.stringify(body)}`);

    const [DELIVERIE] = await DeliverieRepository.updateDeliverieToCancel(idDeliverie, body);

    return DELIVERIE;
  }

  async updateDeliverieQualificationAverage(idDeliverie, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.updateDeliverieQualificationAverage: params ${JSON.stringify(idDeliverie)}`);
    logger.info(`Start DeliverieService.updateDeliverieQualificationAverage: body ${JSON.stringify(body)}`);

    const [DELIVERIE] = await DeliverieRepository.updateDeliverieQualificationAverage(idDeliverie, body);

    return DELIVERIE;
  }

  async getDeliveriesByIdProject(projectId, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start DeliverieService.getDeliveriesByIdProject: param ${JSON.stringify(projectId.id)}`);

    return DeliverieRepository.getDeliveriesByIdProject(projectId.id);
  }

  async getDeliveriesAndHomeworksByIdProject(homeworkId, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start DeliverieService.getDeliveriesAndHomeworksByIdProject: param ${JSON.stringify(homeworkId.id)}`);

    return DeliverieRepository.getDeliveriesByIdHomeworkProces(homeworkId.id);
  }

  async getDeliveriesProcessAndHomeworksById(homeworkId, process, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start DeliverieService.getDeliveriesProcessAndHomeworksById: param ${JSON.stringify(homeworkId)}`);

    logger.info(`Start DeliverieService.getDeliveriesProcessAndHomeworksById: param ${JSON.stringify(process)}`);

    const deliverie = DeliverieRepository.getDeliveriesByIdHomeworkProcess(homeworkId, process);

    const deliverieTwo = await Promise.mapSeries(deliverie, async (deliveries) => {
      const images = await DeliverieRepository.getImageByIdDeliverie(deliveries.id);

      console.log(deliveries);

      const imagesDeliverie = await Promise.mapSeries(images, async (image) => image.urlPhoto);

      console.log(images);

      const { id, ...rest } = deliveries;

      return { id, ...rest, imagesDeliverie };
    });

    return deliverieTwo;
  }

  async saveImageOfDeliverie(deliverieImage, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start DeliverieService.saveImageOfDeliverie: params ${JSON.stringify(deliverieImage)}`);
    const [res] = await DeliverieRepository.saveImageOfDeliverie(deliverieImage);

    return res;
  }
}

const deliverieServices = new DeliverieServices();
module.exports = deliverieServices;
