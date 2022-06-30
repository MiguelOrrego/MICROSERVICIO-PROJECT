const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');

const API = '/api/project-ms/image/homework';

chai.use(chaiHttp);


describe('endpoint update updateHomeworkImageByIdHomework ', () => {
  before(() => Helper.migrate());

  after(async () => {
    await Helper.clear();
  });

  it('update updateHomeworkImageByIdHomework validation success', async () => {
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

    await Helper.createImageHomework({
      idHomework: resHomework.id,
      urlPhoto: 'example.jpg',

    });

    return chai
      .request(app)
      .put(`${API}/${resHomework.id}`)
      .send({
        urlPhoto: 'example.jpg',
        url: 'https//:example.jpg',
      }).then(async (res) => {
        const { body } = res;
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('update updateHomeworkImageByIdHomework validation error in request', async () => {
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

    await Helper.createImageHomework({
      idHomework: resHomework.id,
      urlPhoto: 'example.jpg',

    });

    return chai
      .request(app)
      .put(`${API}/${resHomework.id}`)
      .send({ })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });

  it('update updateHomeworkImageByIdHomework validation error in param', () => chai
    .request(app)
    .put(`${API}/8312739`)
    .send({
      urlPhoto: 'example.jpg',
      url: 'https//:example.jpg',
    }).then(async (res) => {
      const { body } = res;
      console.log(body);
      assert.equal(body.length, 0);
    }));
});

describe('endpoint deleteHomeworImageByIdHomework ', () => {
  before(() => Helper.migrate());

  after(async () => {
    await Helper.clear();
  });

  it('deleteHomeworImageByIdHomework validation success', async () => {
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

    const [imageHomework] = await Helper.createImageHomework({
      idHomework: resHomework.id,
      urlPhoto: 'example.jpg',
    });

    return chai
      .request(app)
      .delete(`${API}/${imageHomework.idHomework}`)
      .then(async (res) => {
        const { body } = res;
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('deleteHomeworImageByIdHomework validation error in param', () => chai
    .request(app)
    .delete(`${API}/8312739`)
    .then(async (res) => {
      const { body } = res;
      console.log(body);
      assert.equal(body.length, 0);
    }));
});
