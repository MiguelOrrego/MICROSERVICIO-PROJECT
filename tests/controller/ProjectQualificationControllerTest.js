const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const ProjectQualificationRepository = require('../../app/repositories/ProjectQualificationRepository');

const API = '/api/project-ms/projectQualification';
chai.use(chaiHttp);

describe(' Get Project Qualification By IdProject', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are ProjectQualification and it returns ', async () => {
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

    const [resProjectQualification] = await Helper.createProjectQualification({
      idUser: 4,
      idProject: resProject.id,
      stars: 4,
    });

    return chai
      .request(app)
      .get(`${API}/${resProjectQualification.idProject}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});

describe('endpoint update ProjectQualification ', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('update ProjectQualification validation success', async () => {
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

    const [resProjectQualification] = await Helper.createProjectQualification({
      idUser: 4,
      idProject: resProject.id,
      stars: 4,
    });


    return chai
      .request(app)
      .put(`${API}/${resProjectQualification.id}`)
      .send({
        idUser: 4,
        idProject: resProjectQualification.idProject,
        stars: 5,
      }).then(async () => {
        const [data] = await ProjectQualificationRepository
          .getProjectQualificationByProject(resProjectQualification.idProject);

        console.log(data);

        assert.equal(data.idUser, resProjectQualification.idUser);
      });
  });
});

describe('Get Project Qualification By IdUser And IdProject', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are ProjectQualification and it returns ', async () => {
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

    const [resProjectQualification] = await Helper.createProjectQualification({
      idUser: 4,
      idProject: resProject.id,
      stars: 4,
    });

    return chai
      .request(app)
      .get(`${API}/${resProjectQualification.idUser}/${resProjectQualification.idProject}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});

describe('ProjectQualification register', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('register ProjectQualification validation error', () => chai
    .request(app)
    .post(API)
    .send({ })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register ProjectQualification validation susses', async () => {
    const [resProjectQualification] = await Helper.createProject({
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
    });


    return chai
      .request(app)
      .post(API)
      .send({ idUser: 1, idProject: resProjectQualification.id, stars: 3 })
      .then(async (response) => {
        const { status, body } = response;
        console.log(body);
        console.log(status, body);
        assert.equal(body.length, 1);
        assert.equal(status, 200);
      });
  });
});
