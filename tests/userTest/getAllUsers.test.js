import supertest from 'supertest';
import app  from '../../src/app';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/user/';

describe('GET  ALL USER endpoint', () => {
  beforeAll( async () => {
    await TestSetup.createTables();
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  describe('GET ALL USERS endpoint', () => {
    it('should return an appropraite message when user doesnt exist', async done => {
      const res = await request
      .get(url)
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.users).toHaveLength(3);
      done();
    });
  });
});