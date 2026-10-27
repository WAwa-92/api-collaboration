const request = require('supertest');
const app = require('../src/app');

async function getToken(username) {
  const response = await request(app).post('/auth/login').send({ username });
  return response.body.token;
}

describe('Members API - authorization', () => {
  it('returns 403 when a non-organizer adds a member', async () => {
    const token = await getToken('john.doe');

    const response = await request(app)
      .post('/projects/1/members')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test User', role: 'QA' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Only organizer can perform this action' });
  });
});
