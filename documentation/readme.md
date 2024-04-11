# Carecentive.net Garmin API Integration

In the following sections, there will be given a brief tutorial on how to set up the relevant components for your Garmin API integration.

## Garmin Developer Portal

### Step 1

Request access to the Garmin Connect Developer Program via this [form](https://www.garmin.com/en-US/forms/GarminConnectDeveloperAccess/).

## Step 2

When accepted, log into the [Garmin Connect Developer Portal](https://developerportal.garmin.com/)
Navigate to the "Apps" page and create an application. Fill out the form with the according data. 
The current integration of the Garmin API into Carecentive allows you to pull from the Health API and the Activity API.
Requesting a production level application will give you unrestricted api access, while requesting a evaluation level application will come with rate limiting on your api requests.

## Step 3

When the application is approved, navigate to your application and copy your *Consumer Key* and *Consumer Secret*.

## Step 4

Navigate to the table *garmin_api_dev* in your Carecentive mysql database. Be sure there is no other row besides the one you are going to create now.
Fill out the columns in the table with the copied data. From now on, everytime an api request is made via Carecentive, this data is going to be used to sign it.

## Example Usage

/scripts/pollGarminData.js shows an example of using the functions offered by the implementation. Here is a quick oversight over the functions you can use.

| Function | Description | Parameters
| ----------- | ----------- | -----------
| getAllDataOneUser(userId, startTime, endTime) | Fetches and processes all Garmin API data for one registered Garmin user. | *userId*: The user ID the data is supposed to be pulled for. *startTime*: The start time in seconds. *endTime*: The end time in seconds. |
| getOneDataAllUsers(api_type, startTime, endTime) | Fetches and processes one type of Garmin API data for all registered Garmin users. | *api_type*: The type of Garmin API data to be pulled (daily_summary, sleep_summary, activity). *startTime*: The start time in seconds. *endTime*: The end time in seconds.
| getAllDataAllUsers(startTime, endTime) | Fetches and processes one type of Garmin API data for all registered Garmin users. | *startTime*: The start time in seconds. *endTime*: The end time in seconds.
| getAllDataAllUsersTimeless() | For each user, queries all API types starting from the last time data from the individual API was pulled until the time of the function call. | -