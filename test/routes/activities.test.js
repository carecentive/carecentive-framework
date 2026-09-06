/**
 * Example test — how to test this app's own custom code.
 *
 * Route test for the custom router routes/activities.js. Exercises the full
 * slice: supertest -> Express -> core's Authentication.authenticateToken ->
 * ActivityService -> core Objection models -> migrated in-memory SQLite.
 *
 * The reusable rig (initTestDb / buildTestApp / signToken) comes from
 * @carecentive/carecentive-core/testing via ../helpers. Copy this file's shape
 * for your own routes and services.
 */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { initTestDb, destroyTestDb, buildTestApp, signToken } = require('../helpers');

const activitiesRouter = require('../../routes/activities');
const User = require('@carecentive/carecentive-core/models/User');

test('GET /api/activities', async (t) => {
  const knex = await initTestDb();
  t.after(() => destroyTestDb(knex));

  const app = buildTestApp([{ path: '/api/activities', router: activitiesRouter }]);

  await t.test('401 when no auth cookie is sent', async () => {
    const res = await request(app).get('/api/activities');
    assert.equal(res.status, 401);
  });

  await t.test('403 when the auth cookie is not a valid token', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Cookie', ['token=not-a-real-jwt']);
    assert.equal(res.status, 403);
  });

  await t.test('200 with the activity payload for an authenticated user', async () => {
    const user = await User.query().insert({
      name: 'alice',
      email: 'alice@example.com',
      password_hash: 'x',
    });

    const token = signToken({ user_id: user.id, name: user.name });

    const res = await request(app)
      .get('/api/activities')
      .set('Cookie', [`token=${token}`]);

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, {
      activityState: '',
      activities: { sampleQuestionnaire: true },
    });
  });
});
