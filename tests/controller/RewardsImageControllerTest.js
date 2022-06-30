const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');

const API = '/api/project-ms/reward/image';

chai.use(chaiHttp);

describe('Endpoint saveImageReward', () => {
  before(() => Helper.migrate());

  after(async () => {
    await Helper.clear();
  });

  it('insert Image', async () => {
    const [PROJECTS] = await Helper.createProject({
      idUser: 1,
      title: 'random',
      objectives: 'random',
      description: 'random...',
      targetAudience: 1,
      minimal_cost: 500,
      optimal_cost: 600,
      location: 'quindio',
      process: 1,
      qualification: 0,
    });

    const [REWARDS] = await Helper.createReward({
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 3000,
    });

    chai
      .request(app)
      .post(`${API}`).send({
        idReward: REWARDS.id,
        urlPhoto: ['https://res.cloudinary.com/tavo-villada/image/upload/v1581608372/wcrtmcgfev9hxounmuas.jpg'],
      })
      .then(async (res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        console.log(body);
      });
  });


  it('insert various Images', async () => {
    const [PROJECTS] = await Helper.createProject({
      idUser: 1,
      title: 'random',
      objectives: 'random',
      description: 'random...',
      targetAudience: 1,
      minimal_cost: 200,
      optimal_cost: 700,
      location: 'risaralda',
      process: 1,
      qualification: 0,
    });

    const [REWARDS] = await Helper.createReward({
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 3000,
    });

    chai
      .request(app)
      .post(`${API}`).send({
        idReward: REWARDS.id,
        urlPhoto: [
          'https://res.cloudinary.com/tavo-villada/image/upload/v1581608372/wcrtmcgfev9hxounmuas.jpg',
          'https://res.cloudinary.com/tavo-villada/image/upload/v1581608372/wcrtmcgfev9hxounmuas.jpg',
          'https://res.cloudinary.com/tavo-villada/image/upload/v1581608372/wcrtmcgfev9hxounmuas.jpg',
        ],
      })
      .then(async (res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        console.log(body);
      });
  });

  it('insert false body', async () => {
    const [PROJECTS] = await Helper.createProject({
      idUser: 1,
      title: 'random',
      objectives: 'random',
      description: 'random...',
      targetAudience: 1,
      minimal_cost: 800,
      optimal_cost: 900,
      location: 'antioquia',
      process: 1,
      qualification: 0,
    });

    const [REWARDS] = await Helper.createReward({
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 3000,
    });

    chai
      .request(app)
      .post(`${API}`).send({
        idReward: REWARDS.id,
        urlPhotoss: [
          'https://res.cloudinary.com/tavo-villada/image/upload/v1581608372/wcrtmcgfev9hxounmuas.jpg',
        ],
      })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 400);
      });
  });
});
