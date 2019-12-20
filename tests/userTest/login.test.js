import supertest from 'supertest';
import app  from '../../src/app';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/user/login';

describe('POST LOGIN User endpoint', () => {
  beforeAll( async () => {
    await TestSetup.createTables();
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  describe('LOGIN endpoint', () => {
    it('should login a user', async done => {
      const res = await request
      .post(url)
      .send({email: 'gbols@example.com',password: 'UcheIam'});
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User successfully logged in');
      done();
    });


    it('should not log a user in when a wrong password is provided', async done => {
      const res = await request
      .post(url)
      .send({email: 'gbols@example.com',password: 'cheIam'});
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid email or password');
      done();
    });

    it('should not log a user in the user doesn;t exists in the db', async done => {
      const res = await request
      .post(url)
      .send({email: 'gls@example.com',password: 'UcheIam'});
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid email or password');
      done();
    });
  })
});