import request from 'supertest';
import app from '../../app';

// Get client id
it('response with client id', async () => {
  const clientId = process.env.CLIENT_ID;
  const response = await request(app())
    .get('/api/v1/auth/client-id')
    .send()
    .expect(200);

  expect(response.body.clientId).toEqual(clientId);
});

// Get access token
it('response with access_token', async () => {
  const response = await request(app())
    .get('/api/v1/auth/get-access-token?code=mycode1234')
    .send()
    .expect(200);

  expect(response.body.access).toEqual(true);
});

// Logout user
it('response with success', async () => {
  const response = await request(app())
    .get('/api/v1/auth/logout')
    .send()
    .expect(200);

  expect(response.body.success).toEqual(true);
});
