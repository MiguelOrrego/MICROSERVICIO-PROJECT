const { Router } = require('express');
const ProjectController = require('./controllers/ProjectController');
const DeliverieCrontroller = require('./controllers/DeliverieController');
const HomeworkQualificationController = require('./controllers/HomeworkQualificationController');
const ProjectQualificationController = require('./controllers/ProjectQualificationController');
const RewardsController = require('./controllers/RewardsController');
const HomeworkController = require('./controllers/HomeworkController');
const TargetAudienceController = require('./controllers/TargetAudienceController');
const TypeHomeworkController = require('./controllers/TypeHomeworkController');
const HomeworkImageController = require('./controllers/HomeworkImageController');
const DeliverieQualificationController = require('./controllers/DeliverieQualificationController');


class Routes {
  constructor() {
    this.routes = Router();
    this.config();
  }

  config() {
    this.routes.post('/projects', ProjectController.create);
    this.routes.get('/projects/:id', ProjectController.getOne);
    this.routes.put('/project/qualificationAverage/:id', ProjectController.updateProjectQualificationAverage);

    this.routes.put('/process/edition/project/:id', ProjectController.updateProjectToEdition);
    this.routes.put('/process/project/:id', ProjectController.updateProjectToRevision);
    this.routes.put('/process/aproved/project/:id', ProjectController.updateProjectToAproved);
    this.routes.put('/process/cancel/project/:id', ProjectController.updateProjectToCancel);

    this.routes.put('/homework/process/edition/:id', HomeworkController.updateHomeworkToEdition);
    this.routes.put('/homework/process/revision/:id', HomeworkController.updateHomeworkToRevision);
    this.routes.put('/homework/process/aproved/:id', HomeworkController.updateHomeworkToAproved);
    this.routes.put('/homework/qualification/:id', HomeworkController.updateHomeworkQualificationAverage);

    this.routes.put('/deliverie/edition/:id', DeliverieCrontroller.updateDeliverieToEdition);
    this.routes.put('/deliverie/revision/:id', DeliverieCrontroller.updateDeliverieToRevision);
    this.routes.put('/deliverie/aproved/:id', DeliverieCrontroller.updateDeliverieToAproved);
    this.routes.put('/deliverie/cancel/:id', DeliverieCrontroller.updateDeliverieToCancel);
    this.routes.put('/deliverie/qualification/:id', DeliverieCrontroller.updateDeliverieQualificationAverage);

    this.routes.put('/projects/:id', ProjectController.update);
    this.routes.delete('/projects/:id', ProjectController.delete);
    this.routes.get('/projects/users/:idUser', ProjectController.getUserProject);
    this.routes.get('/projects', ProjectController.getListProjectsWithImage);
    this.routes.get('/project', ProjectController.getListProjectProcessOne);
    this.routes.get('/projectss', ProjectController.getListProjectProcessTwo);

    this.routes.post('/projectQualification',
      ProjectQualificationController.createProjectQualification);
    this.routes.get('/projectQualification/:idUser/:idProject',
      ProjectQualificationController.getProjectQualificationByUserAndProject);
    this.routes.put('/projectQualification/:id',
      ProjectQualificationController.updateProjectQualification);
    this.routes.get('/projectQualification/:idProject',
      ProjectQualificationController.getProjectQualificationByProject);

    this.routes.post('/homeworkQualification', HomeworkQualificationController.create);
    this.routes.get('/homeworkQualification/:idUser/:idHomework',
      HomeworkQualificationController.getHomeworkQualificationByUserAndHomework);
    this.routes.put('/homeworkQualification/:id',
      HomeworkQualificationController.updateHomeworkQualification);
    this.routes.get('/homeworkQualification/:idHomework',
      HomeworkQualificationController.getHomeworkQualificationByHomework);


    this.routes.post('/deliveries', DeliverieCrontroller.create);
    this.routes.get('/deliveries/:id', DeliverieCrontroller.getOneDeliveriesById);
    this.routes.get('/projects/:id/deliveries', DeliverieCrontroller.getDeliveriesByIdProject);
    this.routes.get('/projects/:id/homeworks/deliveries',
      DeliverieCrontroller.getDeliveriesAndHomeworksByIdProject);
    this.routes.get('/projects/:homeworkId/homeworks/deliveries/:process',
      DeliverieCrontroller.getDeliveriesProcessAndHomeworksByIdProject);
    // this.routes.get('/projects/:id/homeworks/deliveries/process/:id',
    //   DeliverieCrontroller.getDeliveriesProcessAndHomeworksByIdProject);

    this.routes.post('/rewards', RewardsController.createRewards);
    this.routes.get('/rewards/:id', RewardsController.getRewardsById);
    this.routes.put('/rewards/:id', RewardsController.updateRewards);
    this.routes.delete('/rewards/:id', RewardsController.deleteRewardsById);
    this.routes.get('/projects/:id/rewards', RewardsController.getRewardsByIdProject);
    this.routes.post('/projects/homework', HomeworkController.create);
    this.routes.get('/homework/:id', HomeworkController.getOne);
    this.routes.put('/homework/:id', HomeworkController.updateHomework);
    this.routes.delete('/homework/:id', HomeworkController.deleteHomework);
    this.routes.get('/typeHomework', TypeHomeworkController.getTypeHomeworks);
    this.routes.delete('/image/homework/:id', HomeworkImageController.deleteHomeworImageByIdHomework);

    this.routes.put('/image/homework/:id', HomeworkImageController.updateHomeworkImageByIdHomework);

    this.routes.get('/projects/:id/homework', HomeworkController.getHomeworkProject);
    this.routes.get('/project/:id/homework', HomeworkController.getHomeworkProjectByIdProcess);
    this.routes.get('/projectss/:id/homework', HomeworkController.getHomeworkProjectByIdProcessTwo);
    this.routes.get('/projectsss/:id/homework', HomeworkController.getHomeworkProjectByIdProcessThird);

    this.routes.get('/targetAudience', TargetAudienceController.getList);
    this.routes.post('/projects/image', ProjectController.saveImage);
    this.routes.post('/homework/image', HomeworkController.saveImage);
    this.routes.post('/reward/image', RewardsController.saveImageReward);

    this.routes.post('/deliveries/image', DeliverieCrontroller.saveImage);

    this.routes.post('/deliveriesQualification',
      DeliverieQualificationController.createDeliverieQualification);
    this.routes.get('/deliveriesQualification/:idUser/:idDeliverie',
      DeliverieQualificationController.getDeliverieQualificationByUserAndDeliverie);
    this.routes.get('/deliveriesQualification/:idDeliverie',
      DeliverieQualificationController.getDeliverieQualificationByDeliverie);
    this.routes.put('/deliveriesQualification/:id',
      DeliverieQualificationController.updateDeliverieQualification);
  }
}
const routes = new Routes();
module.exports = routes.routes;
