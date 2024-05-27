# Google Fitness API Integration

See file `app.js`

## Implementation

Setup your google console app for authentication by following `SetupGoogleAuth.pdf` file.
Update `.env` file with your google console app credentials as GCLIENT_ID, GCLIENT_SECRET and GREDIRECT_URI.
For example, see `.env.example` file.

Express Router stored in `@carecentive/carecentive-core/routes/googleFitness` contains all the API endpoints necessary for Google Fitness integration. It can be used with express app.

Cron Job is also created for daily auto-synchronisation of fitness data for each User which collects data everyday at midnight. See file `services/DailyFitnessService.js`. We only need to import the file in the entry point of express app.
