const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const deliverieRepository = require('../../app/repositories/DeliverieRepository');

const API = '/api/project-ms/deliveries';
const API2 = '/api/project-ms/deliverie';
const API_BETWEEN = '/api/project-ms/projects';

chai.use(chaiHttp);

describe('deliverie register', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('register deliverie validation error', () => chai
    .request(app)
    .post(API)
    .send({ })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register deliverie validation success', async () => {
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
    const homeWork = {
      idProject: obj.id,
      name: 'comprar elementos deportivos',
      objectives: 'dotar a los jovenes de elementos deportivos',
      description: 'se compraran una serie de accesorios.....',
      idTypeHomework: 1,
      minimal_cost: 100000,
      optimal_cost: 200000,
    };
    const [res] = await Helper.createHomework(homeWork);

    return chai
      .request(app)
      .post(API)
      .send({ idHomework: res.id, description: 'link del entrega' })
      .then(async (response) => {
        const { status, body } = response;
        console.log('output', body, body.id);
        const resDeliveries = await deliverieRepository.findDeliverieById(body.id);
        console.log('validate', resDeliveries);
        assert.equal(status, 200);
        assert.equal(resDeliveries.id, body.id);
      });
  });
});

describe('Get Deliverie By Id', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('Id validation success', async () => {
    const project = {
      idUser: 1,
      title: 'Y',
      objectives: 'PRUEBA',
      description: 'PRUEBA',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'PRUEBA',
      process: 2,
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const deliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 100 };
    const [DELIVERIES] = await Helper.createDelivarie([deliverie]);

    return chai
      .request(app)
      .get(`${API}/${DELIVERIES.id}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('Invalid params', () => {
    const id = '1ASAADSA';
    chai.request(app)
      .get(`${API}/${id}`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 123;
    chai.request(app)
      .get(`${API}/${id}`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});

describe('Get Deliverie By Id Project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('Id validation success', async () => {
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

    const homework = {
      idProject: PROJECTS.id,
      name: 'L',
      description: 'PRUEBA',
      objectives: 'PRUEBA',
      minimal_cost: 80,
      optimal_cost: 80,
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const deliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 100 };
    await Helper.createDelivarie([deliverie]);

    return chai
      .request(app)
      .get(`${API_BETWEEN}/${PROJECTS.id}/deliveries`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('Invalid params', () => {
    const id = '1ASAADSA';
    chai.request(app)
      .get(`${API_BETWEEN}/${id}/deliveries`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 123;
    chai.request(app)
      .get(`${API_BETWEEN}/${id}/deliveries`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});

describe('Get Deliveries And Homeworks By Id Project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('Id validation success', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);
    const process2 = 1;
    const deliverie = {
      idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 1, process: 1,
    };
    await Helper.createDelivarie([deliverie]);

    return chai
      .request(app)
      .get(`${API_BETWEEN}/${PROJECTS.id}/homeworks/deliveries/${process2}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Invalid params', () => {
    const id = '1ASAADSA';
    chai.request(app)
      .get(`${API_BETWEEN}/${id}/homeworks/deliveries`)
      .then(assert.fail)
      .catch((res) => {
        assert.equal(res.status, 500);
      });
  });

  it('Id inexist', () => {
    const id = 123;
    chai.request(app)
      .get(`${API_BETWEEN}/${id}/homeworks/deliveries`)
      .then((res) => {
        const { body, status } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 0);
      });
  });
});

describe('Endpoint to change deliverie process', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Put process deliverie to 1 (Edition) by idDeliverie succes', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const bodyDeliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 10.0 };
    const [DELIVERIE] = await Helper.createDelivarie([bodyDeliverie]);

    return chai
      .request(app)
      .put(`${API2}/edition/${DELIVERIE.id}`)
      .send({
        launch_at: '2020-03-10 09:37:45.004404-05',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Put process deliverie to 1 (Edition) by idDeliverie not found', () => chai
    .request(app)
    .put(`${API2}/edition/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process deliverie to 1 (Edition) by idDeliverie error in data', () => chai
    .request(app)
    .put(`${API2}/edition/dsad`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put process deliverie to 2 (Revision) by idDeliverie success', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const bodyDeliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 10.0 };
    const [DELIVERIE] = await Helper.createDelivarie([bodyDeliverie]);

    return chai
      .request(app)
      .put(`${API2}/revision/${DELIVERIE.id}`)
      .send({
        launch_at: '2020-03-10 09:37:45.004404-05',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Put process deliverie to 2 (Revision) by idDeliverie not found', () => chai
    .request(app)
    .put(`${API2}/revision/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process deliverie to 2 (Revision) by idDeliverie error in data', () => chai
    .request(app)
    .put(`${API2}/revision/dsad`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put process deliverie to 3 (Aproved) by idDeliverie success', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const bodyDeliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 10.0 };
    const [DELIVERIE] = await Helper.createDelivarie([bodyDeliverie]);

    return chai
      .request(app)
      .put(`${API2}/aproved/${DELIVERIE.id}`)
      .send({
        launch_at: '2020-03-10 09:37:45.004404-05',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Put process deliverie to 3 (Aproved) by idDeliverie not found', () => chai
    .request(app)
    .put(`${API2}/aproved/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process deliverie to 3 (Aproved) by idDeliverie error in data', () => chai
    .request(app)
    .put(`${API2}/aproved/dsadsa`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put process deliverie to 4 (Cancel) by idDeliverie success', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const bodyDeliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 10.0 };
    const [DELIVERIE] = await Helper.createDelivarie([bodyDeliverie]);

    return chai
      .request(app)
      .put(`${API2}/cancel/${DELIVERIE.id}`)
      .send({
        launch_at: '2020-03-10 09:37:45.004404-05',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Put process deliverie to 4 (Cancel) by idDeliverie not found', () => chai
    .request(app)
    .put(`${API2}/cancel/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process deliverie to 4 (Cancel) by idDeliverie error in data', () => chai
    .request(app)
    .put(`${API2}/cancel/dsadsa`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put deliverie qualification by idDeliverie Succes', async () => {
    const project = {
      idUser: 1,
      title: 'M',
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
      idTypeHomework: 1,
      qualification: 100,
    };
    const [HOMEWORKS] = await Helper.createHomework([homework]);

    const bodyDeliverie = { idHomework: HOMEWORKS.id, description: 'PRUEBA', qualification: 10.0 };
    const [DELIVERIE] = await Helper.createDelivarie([bodyDeliverie]);

    return chai
      .request(app)
      .put(`${API2}/qualification/${DELIVERIE.id}`)
      .send({
        qualification: 3.0,
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('Put deliverie qualification by idDeliverie Not Found', () => chai
    .request(app)
    .put(`${API2}/qualification/313123123`)
    .send({
      qualification: 3.0,
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put deliverie qualification by idDeliverie error in data', () => chai
    .request(app)
    .put(`${API2}/qualification/dsadsa`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});
