import supertest from 'supertest';
import models from '../../src/server/models';
import app  from '../../src/app';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/user/';

describe('GET USER endpoint', () => {
  beforeAll( async () => {
    await TestSetup.createTables();
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  describe('GET a USERBYID endpoint', () => {
    it('should login a user', async done => {
      const { id } = await models.User.findOne({ where: {email: 'gbols@example.com'}})
      const res = await request
      .get(url+id)
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('user succesfully retrieved');
      done();
    });

    it('should return an appropraite message when user doesnt exist', async done => {
      const res = await request
      .get(url + '900000')
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('user not found');
      done();
    });
  });
});