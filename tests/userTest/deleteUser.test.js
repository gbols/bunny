import supertest from 'supertest';
import models from '../../src/server/models';
import app  from '../../src/app';
import { getToken } from '../../src/utils/helpers';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/user/';

describe('DELETE USER endpoint', () => {
  beforeAll( async () => {
    await TestSetup.createTables();
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  describe('DELETE the provided user endpoint', () => {
    it('should delete a given user', async done => {
      const { id } = await models.User.findOne({ where: {email: 'gbols@example.com'}})
      const res = await request
      .delete(url+id)
      .set('Authorization', `Bearer ${getToken({role:'standard'})}`)
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('unauthorized to perform this action');
      done();
    });

    it('should not allow an unauthenticated user access route', async done => {
      const { id } = await models.User.findOne({ where: {email: 'gbols@example.com'}})
      const res = await request
      .delete(url+id)
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('valid token must be provided to access route');
      done();
    });
    
    it('should return an appropraite message when user doesnt exist', async done => {
      const res = await request
      .delete(url + '900000')
      .set('Authorization', `Bearer ${getToken({role:'admin'})}`)
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('user not found');
      done();
    });

    it('should delete a user if the assigned role is admin', async done => {
      const { id } = await models.User.findOne({ where: {email: 'gbols@example.com'}})
      const res = await request
      .delete(url+id)
      .set('Authorization', `Bearer ${getToken({role:'admin'})}`)
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('user successfully deleted');
      done();
    });

  });
});