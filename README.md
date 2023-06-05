# CareCentive Framework

The data hub is responsible for pulling wearable data into the database at regular intervals. 

## Todos
- Remove source/Utils stuff
- Tutorials
- More professional JWT management
- Improve logging
- Journal
- Write documentation
- Testing

## Overview

Essentially, this node.js application consists of two key components:
- User registration: User gives the application consent to access her/his data
- Data manager: Polls data sources/APIs at regular intervals in order to store the data
- Integrity manager: Ensures that user data is available for all intervals

## Libraries

This project is mainly based on 
- [ExpressJS](https://expressjs.com/) as web server/for request handling
- [Knex.js](http://knexjs.org/#Migrations) as database migrator/seeder
- [Objection.js](https://vincit.github.io/objection.js/) as database wrapper 
- [Axios](https://github.com/axios/axios) for API requests

## Installation
- Install Node.js and NPM on your machine
- Clone the repository to your local machine
- Run `npm install` in the console
- Setup your local database (TODO)
- Generate a random JWT token secret, for example using `node`, then `require('crypto').randomBytes(64).toString('hex')`
- Setup the database structure using the`npx knex migrate:latest` command
- Run the application using `npm start`

## Usage

## Development

### Database migrations
