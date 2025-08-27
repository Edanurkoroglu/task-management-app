import request from 'supertest';
import { app } from '../index';

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
