const WithingsDataHub = require('carecentive-core/services/WithingsDataHub');
var dotenv = require('dotenv');

// Required before setting up ORM
dotenv.config();

const { Model, knex } = require('carecentive-core/models/ORM')

// Actual data processing
WithingsDataHub.dataPollBatchUser(1).then(function(){
    console.log("Finished with all tasks. I'm done!")
    process.exit()
});