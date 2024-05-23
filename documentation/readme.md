# Carecentive.net Garmin API Integration

In the following sections, there will be given a brief tutorial on how to set up the relevant components for your Garmin API integration.

## Garmin Developer Portal

### Step 1

Request access to the Garmin Connect Developer Program via this [form](https://www.garmin.com/en-US/forms/GarminConnectDeveloperAccess/).

## Step 2

When accepted, log into the [Garmin Connect Developer Portal](https://developerportal.garmin.com/)
Navigate to the "Apps" page and create an application. Fill out the form with the according data. 
The standard callback url to enter into the form should be "http://localhost:3001/api/auth/garmin/callback", as 3001 is the standard port in the .env.example. This callback url should be set as standard for the backend to correctly handle the callback.
You can then define a custom callback url (GARMIN_CALLBACK_URL in .env) the user will be redirected to after consenting on the garmin connect page.
The current integration of the Garmin API into Carecentive allows you to pull data from the Health API and the Activity API.
Requesting a production level application will give you unrestricted api access, while requesting a evaluation level application will come with rate limiting on your api requests.

## Step 3

When the application is approved, navigate to your application and copy your *Consumer Key* and *Consumer Secret*.

## Step 4

Head to the .env file that you entered your database access credentials before and now enter the consumerkey and consumersecret into the corresponding fields.

## Example Usage

### Using VUE

Running the vue-example project from the Carecentive.net repo will allow you to see and test some examples usages of the implemented features.
After running 'npm install' and 'npm run dev' as described in the vue-example readMe, you should be able to direct to the pages /garmin-register, /garmin-daily-summaries and /garmin-all-summaries. You can see mointor the logs in the carecentive-framework terminal for observation of the background processes.

### Using a script

/scripts/pollGarminData.js shows an example of using the functions offered by the implementation. Here is a quick oversight over the functions you can use.

| Function | Description | Parameters
| ----------- | ----------- | -----------
| getAllDataOneUser(userId, startTime, endTime) | Fetches and processes all Garmin API data for one registered Garmin user. | *userId*: The user ID the data is supposed to be pulled for. *startTime*: The start time in seconds. *endTime*: The end time in seconds. |
| getOneDataAllUsers(api_type, startTime, endTime) | Fetches and processes one type of Garmin API data for all registered Garmin users. | *api_type*: The type of Garmin API data to be pulled (daily_summary, sleep_summary, activity). *startTime*: The start time in seconds. *endTime*: The end time in seconds.
| getAllDataAllUsers(startTime, endTime) | Fetches and processes one type of Garmin API data for all registered Garmin users. | *startTime*: The start time in seconds. *endTime*: The end time in seconds.
| getAllDataAllUsersTimeless() | For each user, queries all API types starting from the last time data from the individual API was pulled until the time of the function call. | -