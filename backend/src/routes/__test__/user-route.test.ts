import request from 'supertest';
import app from '../../app';
import { profileData, reposData } from '../../test/setup';

// Get user profile
it('response with detailed user profile', async () => {
  const cookie = await global.signin();

  const response = await request(app())
    .get('/api/v1/user/profile')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.login).toEqual(profileData.login);
});

// Get user repos
it('response with user repos', async () => {
  const cookie = await global.signin();

  const response = await request(app())
    .get('/api/v1/user/repos')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.repos[0].language).toEqual(reposData[0].language);
});
