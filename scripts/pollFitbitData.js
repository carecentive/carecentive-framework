const FitbitManager = require('@carecentive/carecentive-core/services/fitbit/FitbitManager');
const { Model, knex } = require('@carecentive/carecentive-core/models/ORM')

FitbitManager.pollAllUsersDataWithScheduler();