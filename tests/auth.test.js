const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('returns 400 when username is missing', async () => {
    const response = await request(app).post('/auth/login').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'username is required' });
  });

  it('returns token when username is valid', async () => {
    const response = await request(app).post('/auth/login').send({ username: 'alice.smith' });

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(20);
  });
});
