const request = require('supertest');
const app = require('../src/app');

async function getToken(username) {
  const response = await request(app).post('/auth/login').send({ username });
  return response.body.token;
}

describe('Projects API - security', () => {
  it('returns 401 when Authorization header is missing', async () => {
    const response = await request(app).get('/projects');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Missing or invalid Authorization header' });
  });

  it('returns 401 when token is invalid', async () => {
    const response = await request(app)
      .get('/projects')
      .set('Authorization', 'Bearer invalid.token.value');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid or expired token' });
  });

  it('returns 403 when a non-organizer deletes a project', async () => {
    const token = await getToken('john.doe');

    const response = await request(app)
      .delete('/projects/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Only organizer can perform this action' });
  });
});
