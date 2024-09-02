// __tests__/issueRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import app from index.js

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGO_TEST_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up and close the database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Issue API', () => {
  let issueId;

  it('should create a new issue', async () => {
    const response = await request(app)
      .post('/issues')
      .send({
        title: 'Test Issue',
        description: 'This is a test issue',
        type: 'bug',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Issue');
    issueId = response.body._id; // Save the issue ID for later tests
  });

  it('should get all issues', async () => {
    const response = await request(app).get('/issues');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get issues by type', async () => {
    const response = await request(app).get('/issues/bug');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].type).toBe('bug');
  });

  it('should update an issue', async () => {
    const response = await request(app)
      .put(`/issues/${issueId}`)
      .send({
        title: 'Updated Test Issue',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Test Issue');
  });

  it('should delete an issue', async () => {
    const response = await request(app).delete(`/issues/${issueId}`);
    expect(response.statusCode).toBe(204);
  });
});
