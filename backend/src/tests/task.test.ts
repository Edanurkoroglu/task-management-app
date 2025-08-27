import request from 'supertest';
import { app } from '../index';

describe('Task Routes', () => {
  let authToken: string;

  beforeAll(async () => {
    // Register a user and get token for testing
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'tasktestuser',
        password: 'tasktestpassword',
      });
    authToken = registerResponse.body.token;
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
  });

  it('should get tasks for the authenticated user', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a task', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Task to update',
        description: 'This task will be updated',
        status: 'pending',
      });

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated Task',
        status: 'completed',
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated Task');
    expect(updateResponse.body.status).toBe('completed');
  });

  it('should delete a task', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Task to delete',
        description: 'This task will be deleted',
        status: 'pending',
      });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Task deleted successfully');
  });
});
