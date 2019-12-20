import supertest from 'supertest';
import app  from '../../src/app';
import { validUser, invalidEmail, invalidUser } from './userMock';
import TestSetup from './helpers';

const request = supertest(app);
const url = '/user/signup';

describe('POST SIGNUP User endpoint', () => {
  beforeAll( async () => {
    await TestSetup.createTables();
  });

  afterAll( async () => {
    await TestSetup.destroyTables();
  });

  it('should signup', async done => {
    const res = await request
                .post(url)
                .send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('user successfully created.');
    done();
  });

  it('should not signup two users with the smae credentials', async done => {
    const res = await request
                .post(url)
                .send(validUser);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    done();
  });

  it('should only accept a valid email address', async done => {
    const res = await request
                .post(url)
                .send(invalidEmail);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    done();
  });

  it('should not accept object with missing fields', async done => {
    const res = await request
                .post(url)
                .send(invalidUser);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    done();
  });
});