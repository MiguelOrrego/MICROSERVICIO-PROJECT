const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const QualificationHomeworkRepository = require('../../app/repositories/HomeworkQualificationRepository');

const API = '/api/project-ms/homeworkQualification';
chai.use(chaiHttp);

describe('qualificationHomework register', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('register qualificationHomework validation error', () => chai
    .request(app)
    .post(API)
    .send({ })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register qualificationHomework validation susses', async () => {
    const project = {
      idUser: 20,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 3,
      qualification: 0,
    };

    const [obj] = await Helper.createProject(project);
    const homework = {
      idProject: obj.id,
      name: 'comprar elementos deportivos',
      objectives: 'dotar a los jovenes de elementos deportivos',
      description: 'se compraran una serie de accesorios.....',
      idTypeHomework: 1,
      minimal_cost: 100000,
      optimal_cost: 200000,
    };
    const [res] = await Helper.createHomework(homework);

    return chai
      .request(app)
      .post(API)
      .send({ idUser: 1, idHomework: res.id, stars: 3 })
      .then(async (response) => {
        console.log('kha');
        const { status, body } = response;
        const [resQualification] = await QualificationHomeworkRepository.findQuialificationHomeworkById(body.id);
        console.log(status, body);
        assert.equal(body.id, resQualification.id);
        assert.equal(status, 200);
      });
  });

  it('register qualificationHomework validation error foring key', async () => {
    const project = {
      idUser: 20,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 3,
      qualification: 0,
    };
    const [obj] = await Helper.createProject(project);
    const homework = {
      idProject: obj.id,
      name: 'comprar elementos deportivos',
      objectives: 'dotar a los jovenes de elementos deportivos',
      description: 'se compraran una serie de accesorios.....',
      idTypeHomework: 1,
      minimal_cost: 100000,
      optimal_cost: 200000,
    };
    await Helper.createHomework(homework);

    return chai
      .request(app)
      .post(API)
      .send({ idUser: 1, idHomework: 2, stars: 3 })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
});


describe('Get Homework Qualification By IdHomework', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are HomeworkQualification and it returns ', async () => {
    const [resProject] = await Helper.createProject(
      {
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 3,
        qualification: 0,
      },
    );

    const [resHomework] = await Helper.createHomework({
      idProject: resProject.id,
      name: 'Local para surtir los uniformes',
      description: 'la tarea fue pensada por un equipo de trabajo....',
      objectives: 'tener beneficios econimicos.....',
      minimal_cost: 200000,
      optimal_cost: 300000,
      idTypeHomework: 1,
    });

    const [resHomeworkQualification] = await Helper.createHomeworkQualification({
      idUser: 4,
      idHomework: resHomework.id,
      stars: 4,
    });

    return chai
      .request(app)
      .get(`${API}/${resHomeworkQualification.idHomework}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});

describe('endpoint update HomeworkQualification ', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('update Homework validation success', async () => {
    const [resProject] = await Helper.createProject(
      {
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 3,
        qualification: 0,
      },
    );

    const [resHomework] = await Helper.createHomework({
      idProject: resProject.id,
      name: 'Local para surtir los uniformes',
      description: 'la tarea fue pensada por un equipo de trabajo....',
      objectives: 'tener beneficios econimicos.....',
      minimal_cost: 200000,
      optimal_cost: 300000,
      idTypeHomework: 1,
    });

    const [resHomeworkQualification] = await Helper.createHomeworkQualification({
      idUser: 4,
      idHomework: resHomework.id,
      stars: 4,
    });


    return chai
      .request(app)
      .put(`${API}/${resHomeworkQualification.id}`)
      .send({
        idUser: 4,
        idHomework: resHomework.id,
        stars: 1,
      }).then(async () => {
        const [data] = await QualificationHomeworkRepository
          .findQuialificationHomeworkById(resHomeworkQualification.id);

        console.log(data);

        assert.equal(data.idUser, resHomeworkQualification.idUser);
      });
  });
});


describe('endpoint getHomeworkQualificationByUserAndHomework ', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are HomeworkQualificationByUserAndHomework and it returns ', async () => {
    const [resProject] = await Helper.createProject(
      {
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 3,
        qualification: 0,
      },
    );

    const [resHomework] = await Helper.createHomework({
      idProject: resProject.id,
      name: 'Local para surtir los uniformes',
      description: 'la tarea fue pensada por un equipo de trabajo....',
      objectives: 'tener beneficios econimicos.....',
      minimal_cost: 200000,
      optimal_cost: 300000,
      idTypeHomework: 1,
    });

    const [resHomeworkQualification] = await Helper.createHomeworkQualification({
      idUser: 4,
      idHomework: resHomework.id,
      stars: 4,
    });

    return chai
      .request(app)
      .get(`${API}/${resHomeworkQualification.idUser}/${resHomeworkQualification.idHomework}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});


describe('Get Homework Qualification By IdHomework', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are HomeworkQualification and it returns ', async () => {
    const [resProject] = await Helper.createProject(
      {
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 3,
        qualification: 0,
      },
    );

    const [resHomework] = await Helper.createHomework({
      idProject: resProject.id,
      name: 'Local para surtir los uniformes',
      description: 'la tarea fue pensada por un equipo de trabajo....',
      objectives: 'tener beneficios econimicos.....',
      minimal_cost: 200000,
      optimal_cost: 300000,
      idTypeHomework: 1,
    });

    const [resHomeworkQualification] = await Helper.createHomeworkQualification({
      idUser: 4,
      idHomework: resHomework.id,
      stars: 4,
    });

    return chai
      .request(app)
      .get(`${API}/${resHomeworkQualification.idHomework}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});
