import supertest from 'supertest';
import app  from '../../src/app';
import { validTask, user } from './taskMocks';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/task/';
let theUser;
let theTask;

describe('DELTE TASK User endpoint', () => {
  beforeAll(async () => {
    theUser = await request.post('/user/signup').send(user);
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  it('should add Task', async done => {
     theTask = await request
                .post('/task/add')
                .send(validTask)
                .set('Authorization', `Bearer ${theUser.body.token}`);
               done();
  });

  it('delete task', async done => {
    const res = await request
                .delete(url + theTask.body.task.id)
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    done();
  });

  it('should not find a non existent task', async done => {
    const res = await request
                .delete(url + 90000)
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    done();
  });
});