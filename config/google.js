var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  clientId: process.env.GCLIENT_ID,
  clientSecret: process.env.GCLIENT_SECRET,
  redirectUri: process.env.GREDIRECT_URI,
  dataTypes: [
    {
      name: "Step Count",
      dataTypeName: "com.google.step_count.delta",
    },
    {
      name: "Calories",
      dataTypeName: "com.google.calories.expended",
    },
    {
      name: "Heart Rate",
      dataTypeName: "com.google.heart_rate.summary",
    },
    {
      name: "Blood Glucose",
      dataTypeName: "com.google.blood_glucose.summary",
    },
    {
      name: "Blood Pressure",
      dataTypeName: "com.google.blood_pressure.summary",
    },
    {
      name: "Oxygen Saturation",
      dataTypeName: "com.google.oxygen_saturation.summary",
    },
    {
      name: "Body Fat",
      dataTypeName: "com.google.body.fat.percentage.summary",
    },
    {
      name: "Body Temperature",
      dataTypeName: "com.google.body.temperature.summary",
    },
  ],
};
