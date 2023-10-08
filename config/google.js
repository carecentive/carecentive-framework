var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  clientId: process.env.GCLIENT_ID,
  clientSecret: process.env.GCLIENT_SECRET,
  redirectUri: process.env.GREDIRECT_URI,
};
