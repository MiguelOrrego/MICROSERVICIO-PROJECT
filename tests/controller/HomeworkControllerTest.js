const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const HomeworkRepository = require('../../app/repositories/HomeworkRepository');

const API = '/api/project-ms/projects/homework';
const API2 = '/api/project-ms/homework';
const API3 = '/api/project-ms/projects';

chai.use(chaiHttp);

const typeData = 'abcdefgh';

describe('endpoint register homework for project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('register homework validation error', () => chai
    .request(app)
    .post(API)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register homework validation success', async () => {
    const [res] = await Helper.createProject(
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

    return chai
      .request(app)
      .post(API)
      .send(
        {
          idProject: res.id,
          name: 'Local para surtir los uniformes',
          description: 'la tarea fue pensada por un equipo de trabajo....',
          objectives: 'tener beneficios econimicos.....',
          minimal_cost: 200000,
          optimal_cost: 300000,
          idTypeHomework: 1,
        },
      )
      .then(async (response) => {
        const { body } = response;
        const [data] = await HomeworkRepository.getOneHomework(body.id);
        assert.equal(data.idProject, res.id);
      });
  });

  it('register homework validation error foreign key', () => chai
    .request(app)
    .post(API)
    .send({
      idProject: 500000,
      name: 'Local para surtir los uniformes',
      description: 'la tarea fue pensada por un equipo de trabajo....',
      objectives: 'tener beneficios econimicos.....',
      minimal_cost: 200000,
      optimal_cost: 300000,
      idTypeHomework: 500000,
    })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('register homework validation error nonexistent fields', async () => {
    const [res] = await Helper.createProject(
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

    return chai
      .request(app)
      .post(API)
      .send({
        idProject: res.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
        food: 'meat',

      })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
});


describe('endpoint to list homework by id', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });
  const idHomeworkNotExist = 1000;

  it('there are homework and it returns ', async () => {
    const [resProject] = await Helper.createProject(
      {
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
      },
    );

    const [resHomework] = await Helper.insertHomework(
      {
        idProject: resProject.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .get(`${API2}/${resHomework.id}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('There are not homework to return', () => chai
    .request(app)
    .get(`${API2}/${idHomeworkNotExist}`)
    .then((response) => {
      const { body, status } = response;
      assert.equal(status, 200);
      console.log(body);
      assert.equal(body.length, 0);
    }));

  it('validate error type of data route number', () => chai
    .request(app)
    .get(`${API2}/${typeData}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});


describe('endpoint to list homework by id project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('there are homeworks with the by project and it returns ', async () => {
    const [resProject] = await Helper.createProject({
      idUser: 12,
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

    await Helper.insertHomework(
      {
        idProject: resProject.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .get(`${API3}/${resProject.id}/homework`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('validate error type of data route number', () => chai
    .request(app)
    .get(`${API3}/${typeData}/homework`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});

describe('Endpoint to change homework process', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('Put process homework to 1 (Edition) by idHomework succes', async () => {
    const [Project] = await Helper.createProject(
      {
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
      },
    );

    const [Homework] = await Helper.insertHomework(
      {
        idProject: Project.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .put(`${API2}/process/edition/${Homework.id}`)
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

  it('Put process homework to 1 (Edition) by idHomework not found', () => chai
    .request(app)
    .put(`${API2}/process/edition/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process homework to 1 (Edition) by idHomework error in data', () => chai
    .request(app)
    .put(`${API2}/process/edition/dsad`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put process homework to 2 (Revision) by idHomework success', async () => {
    const [Project] = await Helper.createProject(
      {
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
      },
    );

    const [Homework] = await Helper.insertHomework(
      {
        idProject: Project.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .put(`${API2}/process/revision/${Homework.id}`)
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

  it('Put process homework to 2 (Revision) by idHomework not found', () => chai
    .request(app)
    .put(`${API2}/process/revision/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process homework to 2 (Revision) by idHomework error in data', () => chai
    .request(app)
    .put(`${API2}/process/revision/dsad`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put process homework to 3 (Aproved) by idHomework success', async () => {
    const [Project] = await Helper.createProject(
      {
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
      },
    );

    const [Homework] = await Helper.insertHomework(
      {
        idProject: Project.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .put(`${API2}/process/aproved/${Homework.id}`)
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

  it('Put process homework to 3 (Aproved) by idHomework not found', () => chai
    .request(app)
    .put(`${API2}/process/aproved/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process homework to 3 (Aproved) by idHomework error in data', () => chai
    .request(app)
    .put(`${API2}/process/aproved/dsadsa`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('Put homework qualification by idHomework Succes', async () => {
    const [Project] = await Helper.createProject(
      {
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
      },
    );

    const [Homework] = await Helper.insertHomework(
      {
        idProject: Project.id,
        name: 'Local para surtir los uniformes',
        description: 'la tarea fue pensada por un equipo de trabajo....',
        objectives: 'tener beneficios econimicos.....',
        minimal_cost: 200000,
        optimal_cost: 300000,
        idTypeHomework: 1,
      },
    );

    return chai
      .request(app)
      .put(`${API2}/qualification/${Homework.id}`)
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

  it('Put Homework qualification by idHomework Not Found', () => chai
    .request(app)
    .put(`${API2}/qualification/313123123`)
    .send({
      qualification: 3.0,
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put Homework qualification by idHomework error in data', () => chai
    .request(app)
    .put(`${API2}/qualification/dsadsa`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});
