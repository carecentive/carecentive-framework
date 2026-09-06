/**
 * Thin wrapper around carecentive-core's test toolkit, pre-wired with THIS
 * app's own migrations. Import it from tests:
 *
 *   const { initTestDb, destroyTestDb, buildTestApp, signToken } = require('../helpers');
 *
 * Everything reusable lives in @carecentive/carecentive-core/testing; only
 * app-specific wiring belongs here. Add model fixtures / factories for this
 * app's custom tables to this file as the suite grows.
 */
'use strict';

const path = require('path');
const coreTesting = require('@carecentive/carecentive-core/testing');

// Hermetic env before any test requires app code.
coreTesting.applyTestEnvDefaults();

/** This app's own migration directory, run alongside core's. */
const APP_MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'database', 'migrations');

/** initTestDb() from core, plus this app's migrations. */
function initTestDb(opts = {}) {
  return coreTesting.initTestDb({
    ...opts,
    extraMigrationDirs: [APP_MIGRATIONS_DIR, ...(opts.extraMigrationDirs || [])],
  });
}

module.exports = {
  ...coreTesting,
  initTestDb,
  APP_MIGRATIONS_DIR,
};
