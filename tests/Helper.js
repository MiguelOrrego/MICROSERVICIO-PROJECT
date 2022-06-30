const Helpers = module.exports;
const db = require('../app/utils/DB');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('deliverieImage').del();
  await db('homeworkImage').del();
  await db('projectImage').del();
  await db('qualificationDeliverie').del();
  await db('deliverie').del();
  await db('qualificationHomework').del();
  await db('homeworkImage').del();

  // Primer on cascade con la tabla project
  await db('rewards').del();
  await db('rewardImage').del();

  // Segundo on cascade con la tabla project
  await db('qualificationProject').del();
  await db('homework').del();
  await db('project').del();
};

Helpers.clearHomework = async () => {
  await db('homework').del();
};

Helpers.insertHomework = async (data) => db('homework').insert(data).returning('*');

Helpers.insertDeliverie = async (deliverie) => db('deliverie').insert(deliverie).returning('*');

Helpers.createProject = (project) => db('project').insert(project).returning('*');

Helpers.createReward = (reward) => db('rewards').insert(reward).returning('*');

Helpers.createHomework = (homework) => db('homework').insert(homework).returning('*');

Helpers.createDelivarie = (deliverie) => db('deliverie').insert(deliverie).returning('*');

Helpers.createImageProject = (image) => db('projectImage').insert(image).returning('*');

Helpers.createImageHomework = (image) => db('homeworkImage').insert(image).returning('*');

Helpers.createQualificationDeliverie = (qualificationDeliverie) => db('qualificationDeliverie')
  .insert(qualificationDeliverie).returning('*');

Helpers.createHomeworkQualification = (HomeworkQualification) => db('qualificationHomework')
  .insert(HomeworkQualification).returning('*');

Helpers.createProjectQualification = (ProjectQualification) => db('qualificationProject')
  .insert(ProjectQualification).returning('*');
