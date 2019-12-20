import supertest from 'supertest';
import app  from '../../src/app';
import { validTask, user } from './taskMocks';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/task/';
let theUser;
let theTask;

describe('POST ADD TASK User endpoint', () => {
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

  it('should update task', async done => {
    const res = await request
                .put(url + theTask.body.id)
                .send({
                  "description": "I am the man for the Job"
                })
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    done();
  });

  it('should not find a non existent task', async done => {
    const res = await request
                .put(url + 90000)
                .send({
                  "description": "I am the man for the Job"
                })
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    done();
  });

  describe('GET task a given user', () => {
    it('should get tasks by a given user', async done => {
      const res = await request
      .get('/task/1')
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      done();
    });

    it('should get  all tasks that doesnt exits', async done => {
      const res = await request
      .get('/task')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true);
      done();
    });
  })
});