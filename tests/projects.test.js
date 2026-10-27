const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { secret } = require('../src/config/jwt');

async function getToken(username) {
  const response = await request(app).post('/auth/login').send({ username });
  return response.body.token;
}

describe('Projects API - security', () => {
  it('returns 401 when Authorization header is missing', async () => {
    const response = await request(app).get('/projects');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        category: 'security',
        code: 'AUTH_MISSING_OR_INVALID_HEADER',
        message: 'Missing or invalid Authorization header'
      }
    });
  });

  it('returns 401 when token is invalid', async () => {
    const response = await request(app)
      .get('/projects')
      .set('Authorization', 'Bearer invalid.token.value');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        category: 'security',
        code: 'AUTH_INVALID_OR_EXPIRED_TOKEN',
        message: 'Invalid or expired token'
      }
    });
  });

  it('returns 401 when token is forged', async () => {
    const forgedToken = jwt.sign({ sub: 'alice.smith' }, 'wrong-secret', { expiresIn: '2h' });
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${forgedToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        category: 'security',
        code: 'AUTH_INVALID_OR_EXPIRED_TOKEN',
        message: 'Invalid or expired token'
      }
    });
  });

  it('returns 401 when token is expired', async () => {
    const expiredToken = jwt.sign({ sub: 'alice.smith' }, secret, { expiresIn: '-1s' });
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        category: 'security',
        code: 'AUTH_INVALID_OR_EXPIRED_TOKEN',
        message: 'Invalid or expired token'
      }
    });
  });

  it('returns 403 when a non-organizer deletes a project', async () => {
    const token = await getToken('john.doe');

    const response = await request(app)
      .delete('/projects/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: {
        category: 'security',
        code: 'AUTH_INSUFFICIENT_RIGHTS',
        message: 'Only organizer can perform this action'
      }
    });
  });
});
