const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const Helper = require('../Helper');

const API = '/api/project-ms/deliveriesQualification';

chai.use(chaiHttp);

describe('Delivarie Qualification', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });

  describe('Create', () => {
    it('Success', async () => {
      const project = {
        idUser: 1,
        title: 'PRUEBA',
        objectives: 'PRUEBA',
        description: 'PRUEBA',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'PRUEBA',
        process: 1,
        qualification: 0,
      };
      const [PROJECTS] = await Helper.createProject([project]);

      const homework = {
        idProject: PROJECTS.id,
        name: 'PRUEBA',
        description: 'PRUEBA',
        objectives: 'PRUEBA',
        minimal_cost: 80,
        optimal_cost: 80,
        idTypeHomework: 2,
        qualification: 100,
      };
      const [HOMEWORKS] = await Helper.createHomework([homework]);

      const deliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 100 };
      const [DELIVERIE] = await Helper.createDelivarie([deliverie]);

      const qualificationDeliverie = { idUser: 1, idDeliverie: DELIVERIE.id, stars: 5 };

      return chai
        .request(server)
        .post(API)
        .send(qualificationDeliverie)
        .then((response) => {
          const { body, status } = response;
          assert.equal(status, 200);
          assert.equal(body.length, 1);
        });
    });

    it('Invalid body', () => chai
      .request(server)
      .post(API)
      .send({})
      .then(assert.fail)
      .catch((err) => {
        assert.equal(err.status, 400);
      }));

    it('Error in Foreign Keys', () => chai
      .request(server)
      .post(API)
      .send({ idUser: 1, idDeliverie: 808912, starts: 10 })
      .then(assert.fail)
      .catch((response) => {
        assert.equal(response.status, 500);
      }));
  });
});


describe('endpoint update  DeliverieQualification ', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('update DeliverieQualification validation success', async () => {
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

    const deliverie = { idHomework: resHomework.id, description: 'PRUEBA', qualification: 100 };
    const [DELIVERIE] = await Helper.createDelivarie([deliverie]);

    const qualificationDeliverie = { idUser: 1, idDeliverie: DELIVERIE.id, stars: 5 };

    const [resQualificationDeliverie] = await Helper.createQualificationDeliverie(qualificationDeliverie);

    console.log(resQualificationDeliverie);

    return chai
      .request(server)
      .put(`${API}/${resQualificationDeliverie.id}`)
      .send({
        stars: 1,
      }).then((response) => {
        assert.equal(response.status, 200);
      });
  });

  it('update DeliverieQualification validation error', () => chai
    .request(server)
    .put(`${API}/9`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});


describe('Get Deliverie Qualification By IdDeliverie', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('there are Deliverie Qualification and it returns ', async () => {
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


    const deliverie = { idHomework: resHomework.id, description: 'PRUEBA', qualification: 100 };
    const [DELIVERIE] = await Helper.createDelivarie([deliverie]);

    const qualificationDeliverie = { idUser: 1, idDeliverie: DELIVERIE.id, stars: 5 };

    const [resQualificationDeliverie] = await Helper.createQualificationDeliverie(qualificationDeliverie);

    console.log(resQualificationDeliverie);

    return chai
      .request(server)
      .get(`${API}/${resQualificationDeliverie.id}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
      });
  });
});
