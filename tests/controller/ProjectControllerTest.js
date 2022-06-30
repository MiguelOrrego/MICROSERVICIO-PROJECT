const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const ProjectRepository = require('../../app/repositories/ProjectRepository');
const Helper = require('../Helper');


const API = '/api/project-ms/projects';
const API2 = '/api/project-ms';

const typeData = 'abcd';

chai.use(chaiHttp);

describe('endpoint register project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('register project validation error', () => chai
    .request(app)
    .post(API)
    .send({ })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));


  it('register project validation success', () => chai
    .request(app)
    .post(API)
    .send({
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
    })
    .then(async (res) => {
      const { body } = res;
      const [data] = await ProjectRepository.getOneProject(body.id);
      assert.equal(data.qualification, 0);
    }));

  it('register project validation error by target audience and process foreign key', () => chai
    .request(app)
    .post(API)
    .send({
      idUser: 1,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 6,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 6,
      qualification: 0,
    })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('register project validation error nonexistent fields', () => chai
    .request(app)
    .post(API)
    .send({
      idUser: 1,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 6,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 6,
      qualification: 0,
      clausula: 'asdsad',

    })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});

describe('endpoint to list projects by id', () => {
  const idProject2 = 222;
  const idProject = 22;
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('there are projects and it returns ', async () => {
    await Helper.createProject({
      id: idProject,
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
      .get(`${API}/${idProject}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.id, idProject);
      });
  });

  it('There are not projects to return', () => chai
    .request(app)
    .get(`${API}/${idProject2}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('validate error type of data route number', () => chai
    .request(app)
    .get(`${API}/${typeData}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});

describe('endpoint update project by id', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  const idUpdate = 100;

  it('update projects validation success', async () => {
    const [res] = await Helper.createProject({
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
      .put(`${API}/${res.id}`)
      .send({
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes Para Que Tenga Un Futuro Comprometedor',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 20000000,
        optimal_cost: 40000000,
        location: 'Montenegro,Quindio',
        process: 3,
        qualification: 0,
      }).then(async () => {
        const [data] = await ProjectRepository.getOneProject(res.id);
        assert.equal(data.qualification, 0);
      });
  });

  it('update project validation error for foreign keys', async () => {
    const [res] = await Helper.createProject({
      idUser: 20,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 1,
      qualification: 0,
    });

    return chai
      .request(app)
      .put(`${API}/${res.id}`)
      .send({
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes Para Que Tenga Un Futuro Comprometedor',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 222222,
        minimal_cost: 20000000,
        optimal_cost: 40000000,
        location: 'Montenegro,Quindio',
        process: 222222,
        qualification: 0,
      })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });

  it('update project validation error', () => chai
    .request(app)
    .put(`${API}/${idUpdate}`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('validate error type of data route number', () => chai
    .request(app)
    .put(`${API}/${typeData}`)
    .send({
      idUser: 1,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes Para Que Tenga Un Futuro Comprometedor',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 3,
      minimal_cost: 20000000,
      optimal_cost: 60000000,
      location: 'Montenegro,Quindio,Colombia',
      process: 1,
      qualification: 0,
    })
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('update project validation error nonexistent fields', async () => {
    const [res] = await Helper.createProject({
      idUser: 20,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 1,
      qualification: 0,
    });

    return chai
      .request(app)
      .put(`${API}/${res.id}`)
      .send({
        idUser: 1,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 6,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 6,
        qualification: 0,
        clausula: 'asdsad',
      })
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
});

describe('endpoint to list project by id users', () => {
  const idProjectByUser = 1;
  const idProjectByUserNotExist = 22;

  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('there are projects with the by iduser  and it returns ', async () => {
    const [PROJECT] = await Helper.createProject({
      idUser: idProjectByUser,
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

    await Helper.createImageProject({
      idProject: PROJECT.id,
      urlPhoto: 'https://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/3855.png',
    });

    return chai
      .request(app)
      .get(`${API}/users/${idProjectByUser}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('There are not projects with the iduser to return', () => chai
    .request(app)
    .get(`${API}/users/${idProjectByUserNotExist}`)
    .then((response) => {
      const { body, status } = response;
      assert.equal(status, 200);
      console.log(body);
      assert.equal(body.length, 0);
    }));

  it('validate error type of data route number', () => chai
    .request(app)
    .get(`${API}/users/${typeData}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));
});

describe('endpoint to list all projects', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('return all projects ', async () => {
    await Helper.createProject([{
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
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 1,
      qualification: 0,
    }]);

    return chai
      .request(app)
      .get(`${API}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });

  it('does not return projects', () => chai
    .request(app)
    .get(`${API}`)
    .then((response) => {
      const { body, status } = response;
      assert.equal(status, 200);
      console.log(body);
      assert.equal(body.length, 0);
    }));
});


describe('endpoint to delete the project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('delete project validation success ', async () => {
    const [res] = await Helper.createProject(
      {
        idUser: 12,
        title: 'Empresa Nacional De Deportes MA',
        objectives: 'aportar a los jovenenes',
        description: 'empresa creada el 20 de diciembre.....',
        targetAudience: 1,
        minimal_cost: 10000000,
        optimal_cost: 20000000,
        location: 'montenegro',
        process: 1,
        qualification: 0,
      },
    );

    return chai
      .request(app)
      .delete(`${API}/${res.id}`)
      .then(async (response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.message, 'Project deleted');
        assert.equal(body.response.length, 1);
      });
  });


  it('validate error type of data route number', () => chai
    .request(app)
    .delete(`${API}/${typeData}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('process sucessfull', () => chai
    .request(app)
    .get(`${API2}/projectss`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));


  it('return projects by id process = 2 ', async () => {
    await Helper.createProject([{
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
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 1,
      qualification: 0,
    }]);

    return chai
      .request(app)
      .get(`${API2}/project`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
  it('process sucessfull', () => chai
    .request(app)
    .get(`${API2}/project`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));


  it('return projects by id process = 3 ', async () => {
    await Helper.createProject([{
      idUser: 12,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 2,
      qualification: 0,
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 1,
      qualification: 0,
    }]);

    return chai
      .request(app)
      .get(`${API2}/projectss`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
  it('return all projects ', async () => {
    await Helper.createProject([{
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
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 2,
      qualification: 0,
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 3,
      qualification: 0,
    },
    ]);

    return chai
      .request(app)
      .get(`${API2}/project`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
  it('return all projects ', async () => {
    await Helper.createProject([{
      idUser: 12,
      title: 'Empresa Nacional De Deportes MA',
      objectives: 'aportar a los jovenenes',
      description: 'empresa creada el 20 de diciembre.....',
      targetAudience: 1,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'montenegro',
      process: 2,
      qualification: 0,
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 2,
      qualification: 0,
    },
    {
      idUser: 12,
      title: 'Empresa de aguas del quindio',
      objectives: 'aportar a salud de la region',
      description: 'contamos con el apoyo de nuestro gobierno.....',
      targetAudience: 4,
      minimal_cost: 10000000,
      optimal_cost: 20000000,
      location: 'calarca,Quindio',
      process: 3,
      qualification: 0,
    },
    ]);

    return chai
      .request(app)
      .get(`${API2}/projectss`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
});

describe('Endpoint to change process of the project', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clearHomework();
    await Helper.clear();
  });

  it('Put process project to 1 (Edition) by idProject', async () => {
    const [PROJECT] = await Helper.createProject([{
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
    }]);

    return chai
      .request(app)
      .put(`${API2}/process/edition/project/${PROJECT.id}`)
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

  it('Put process project to 1 (Edition) by idProject not found', () => chai
    .request(app)
    .put(`${API2}/process/edition/project/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process project to 2 (Revision) by idProject', async () => {
    const [PROJECT] = await Helper.createProject([{
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
    }]);

    return chai
      .request(app)
      .put(`${API2}/process/project/${PROJECT.id}`)
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

  it('Put process project to 2 (Revision) by idProject not found', () => chai
    .request(app)
    .put(`${API2}/process/project/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process project to 3 (Aproved) by idProject', async () => {
    const [PROJECT] = await Helper.createProject([{
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
    }]);

    return chai
      .request(app)
      .put(`${API2}/process/aproved/project/${PROJECT.id}`)
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

  it('Put process project to 3 (Aproved) by idProject not found', () => chai
    .request(app)
    .put(`${API2}/process/aproved/project/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put process project to 4 (Cancel) by idProject', async () => {
    const [PROJECT] = await Helper.createProject([{
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
    }]);

    return chai
      .request(app)
      .put(`${API2}/process/cancel/project/${PROJECT.id}`)
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

  it('Put process project to 4 (Cancel) by idProject not found', () => chai
    .request(app)
    .put(`${API2}/process/cancel/project/313123123`)
    .send({
      launch_at: '2020-03-10 09:37:45.004404-05',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('Put Project qualification by idProject Succes', async () => {
    const [PROJECT] = await Helper.createProject([{
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
    }]);

    return chai
      .request(app)
      .put(`${API2}/project/qualificationAverage/${PROJECT.id}`)
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

  it('Put Project qualification by idProject Not Found', () => chai
    .request(app)
    .put(`${API2}/project/qualificationAverage/313123123`)
    .send({
      qualification: 3.0,
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));
});
