const { google } = require("googleapis");
var dotenv = require("dotenv");
dotenv.config();

const auth = {
  clientId: process.env.GCLIENT_ID,
  clientSecret: process.env.GCLIENT_SECRET,
  redirectUri: process.env.GREDIRECT_URI,
};

const oauth2Client = new google.auth.OAuth2(
  auth.clientId,
  auth.clientSecret,
  auth.redirectUri
);

const scopestring =
  "https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.location.read openid https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/userinfo.email";

const scopes = [
  "email",
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.blood_glucose.read",
  "https://www.googleapis.com/auth/fitness.blood_pressure.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.body_temperature.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.location.read",
  "https://www.googleapis.com/auth/fitness.nutrition.read",
  "https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
  "https://www.googleapis.com/auth/fitness.reproductive_health.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
];

const dataTypes = [
  {
    name: "Activity",
    type: "activity",
    dataTypeName: "com.google.activity.segment",
  },
  {
    name: "Step Count",
    type: "step_count",
    dataTypeName: "com.google.step_count.delta",
  },
  {
    name: "Distance Covered",
    type: "distance",
    dataTypeName: "com.google.distance.delta",
  },
  {
    name: "Calories",
    type: "calories",
    dataTypeName: "com.google.calories.expended",
  },
  {
    name: "Heart Rate",
    type: "heart_rate",
    dataTypeName: "com.google.heart_rate.summary",
  },
  {
    name: "Blood Glucose",
    type: "blood_glucose",
    dataTypeName: "com.google.blood_glucose.summary",
  },
  {
    name: "Blood Pressure",
    type: "blood_pressure",
    dataTypeName: "com.google.blood_pressure.summary",
  },
  {
    name: "Oxygen Saturation",
    type: "oxygen_saturation",
    dataTypeName: "com.google.oxygen_saturation.summary",
  },
  {
    name: "Body Fat",
    type: "body.fat",
    dataTypeName: "com.google.body.fat.percentage.summary",
  },
  {
    name: "Body Temperature",
    type: "body.temperature",
    dataTypeName: "com.google.body.temperature.summary",
  },
  {
    name: "Nutrition",
    type: "nutrition",
    dataTypeName: "com.google.nutrition.summary",
  },
];

const ignorables = [
  "active_minutes",
  "cumulative",
  "height",
  "weight",
  "heart_minutes",
  "speed",
  "activity.segment",
  "bmr",
];

function getAuthClient(user) {
  oauth2Client.setCredentials({
    access_token: user.access_token,
    refresh_token: user.refresh_token,
    id_token: user.id_token,
    scope: scopestring,
  });
  return oauth2Client;
}

function dataFormat(format) {
  switch (format) {
    case "floatPoint":
      return "fpVal";
    case "integer":
      return "intVal";
    case "string":
      return "stringVal";
    default:
      return format;
  }
}

function filterDatatypes(allSources) {
  if (allSources.length) {
    const uniqueObjects = Array.from(
      allSources.reduce((uniqueSet, currentObject) => {
        const { name, field } = currentObject.dataType;
        const containsIgnorable = ignorables.some((ignorable) =>
          name.includes(ignorable)
        );

        if (!containsIgnorable) {
          const existingObject = uniqueSet.find((obj) => obj.type === name);

          if (!existingObject) {
            uniqueSet.push({
              name: name.split(".")[2],
              type: name,
              format: dataFormat(field[0].format),
            });
          }
        }
        return uniqueSet;
      }, [])
    );
    return uniqueObjects;
  } else {
    return [];
  }
}

module.exports = {
  auth,
  scopestring,
  scopes,
  dataTypes,
  oauth2Client,
  getAuthClient,
  filterDatatypes,
};
