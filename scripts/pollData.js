var setup = require('../source/setup');

const WithingsDataHub = require('carecentive-core/services/WithingsDataHub');
var dotenv = require('dotenv');
var winston = require('winston');
const app = require('../app');
const http = require('http');

const { Model, knex } = require('carecentive-core/models/ORM')

setup.setup();

// Actual data processing
WithingsDataHub.dataPollBatch().then(function(){
    console.log("Finished with all tasks. I'm done!")
    process.exit()
});