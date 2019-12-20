import supertest from 'supertest';
import app  from '../../src/app';
import { validTask, InvalidTask, user } from './taskMocks';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/task/add';
let theUser;

describe('POST ADD TASK User endpoint', () => {
  beforeAll(async () => {
    theUser = await request.post('/user/signup').send(user);
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  it('should add Task', async done => {
    const res = await request
                .post(url)
                .send(validTask)
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Task successfully created');
    done();
  });

  it('should not allow invalid tasks', async done => {
    const res = await request
                .post(url)
                .send(InvalidTask)
                .set('Authorization', `Bearer ${theUser.body.token}`);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    done();
  });
});