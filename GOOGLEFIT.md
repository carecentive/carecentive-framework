# Google Fitness API Integration

See file `app.js`

## Implementation

Express Router stored in `@carecentive/carecentive-core/routes/googleFitness` contains all the API endpoints necessary for Google Fitness integration. It can be used with express app.

Cron Job `@carecentive/carecentive-core/services/DailyFitnessService` should be imported in the entry file of the express app to initiate auto-synchronisation of Fitness data on daily basis for each users who have provided access
