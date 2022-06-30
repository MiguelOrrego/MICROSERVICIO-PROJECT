const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const Helper = require('../Helper');
const RewardsRepository = require('../../app/repositories/RewardsRepositories');

const API = '/api/project-ms/rewards';
const API_IDPROJECT = '/api/project-ms/projects';

chai.use(chaiHttp);

describe('Rewards', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });

  describe('Create', () => {
    it('Success', async () => {
      const project = {
        idUser: 1,
        title: 'P',
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

      const reward = {
        idProjects: PROJECTS.id,
        description: 'PRUEBA',
        idTypeRewards: 1,
        price: 3000,
      };

      return chai
        .request(server)
        .post(API)
        .send(reward)
        .then((response) => {
          const { body, status } = response;
          assert.equal(status, 200);
          console.log(body);
        });
    });

    it('With invalid params', () => chai
      .request(server)
      .post(API)
      .send({ })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 400);
      }));

    it('Foreign Keys Incorrects', () => chai
      .request(server)
      .post(API)
      .send({
        idProjects: 214213123,
        description: 'PRUEBA',
        idTypeRewards: 213,
        price: 4000,
      })
      .then(assert.fail)
      .catch((response) => {
        assert.equal(response.status, 500);
      }));
  });
});
describe('Get Reward By Id', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });

  it('Success', async () => {
    const project = {
      idUser: 1,
      title: 'Ñ',
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .get(`${API}/${REWARDS.id}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('Invalid params', () => {
    const id = 'KSDAJKSAD';
    chai.request(server)
      .get(`${API}/${id}`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 231313;
    chai.request(server)
      .get(`${API}/${id}`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});
describe('Get Reward By Id Project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .get(`${API_IDPROJECT}/${REWARDS.idProjects}/rewards`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        assert.equal(body.length, 1);
      });
  });

  it('Invalid params', () => {
    const id = 'KSDAJKSAD';
    chai.request(server)
      .get(`${API_IDPROJECT}/${id}/rewards`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 231313;
    chai.request(server)
      .get(`${API_IDPROJECT}/${id}/rewards`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});

describe('Delete Reward', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });
  it('Success', async () => {
    const project = {
      idUser: 1,
      title: 'Q',
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .delete(`${API}/${REWARDS.id}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        assert.equal(body.length, 1);
      });
  });

  it('Invalid params', () => {
    const id = 'KSDAJKSAD';
    chai
      .request(server)
      .delete(`${API}/${id}`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 231313;
    chai
      .request(server)
      .delete(`${API}/${id}`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});

describe('Update Reward', () => {
  before(() => Helper.migrate());

  beforeEach(async () => { await Helper.clear(); });
  it('Success', async () => {
    const project = {
      idUser: 1,
      title: 'B',
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 40000,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .put(`${API}/${REWARDS.id}`)
      .send({
        idProjects: PROJECTS.id, description: 'UPDATE', idTypeRewards: 1, price: 4000,
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('With invalid body', async () => {
    const project = {
      idUser: 1,
      title: 'A',
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 4000,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .put(`${API}/${REWARDS.id}`)
      .send({ })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 400);
      });
  });

  it('Foreign Keys Incorrects', async () => {
    const project = {
      idUser: 1,
      title: 'N',
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

    const reward = {
      idProjects: PROJECTS.id,
      description: 'PRUEBA',
      idTypeRewards: 1,
      price: 4000,
    };
    const [REWARDS] = await RewardsRepository.createRewards(reward);

    return chai
      .request(server)
      .put(`${API}/${REWARDS.id}`)
      .send({
        idProjects: 214213123, description: 'PRUEBA', idTypeRewards: 213, price: 40000,
      })
      .then(assert.fail)
      .catch((response) => {
        assert.equal(response.status, 500);
      });
  });
});
