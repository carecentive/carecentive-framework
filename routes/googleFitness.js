const express = require("express");

const User = require("@carecentive/carecentive-core/models/User");
const GoogleFitnessService = require("../services/FitnessService");
const router = express.Router();
const { google } = require("googleapis");

const authentication = require("@carecentive/carecentive-core/source/Authentication");
const ghelper = require("../source/google");
const { testDateFormat } = require("../source/CustomSource");

router.get(
  "/connection",
  authentication.authenticateToken,
  async function (req, res, next) {
    userId = req.authData.user_id;
    const user = await GoogleFitnessService.getUser(userId);
    if (user) {
      res.status(400).send({
        message: "Google Fit Access already provided.",
      });
    } else {
      const referer = req.get("referer");
      const authorizationUrl = ghelper.oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ghelper.scopes,
        include_granted_scopes: true,
        state: JSON.stringify({ userId: userId, referer: referer }),
      });
      res.send({ url: authorizationUrl });
    }
  }
);

router.get("/auth-callback", async function (req, res, next) {
  const { code, state } = req.query;
  const userState = JSON.parse(state);
  const { tokens } = await ghelper.oauth2Client.getToken(code);
  const ticket = await ghelper.oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: ghelper.auth.clientId,
  });
  try {
    if (ticket.payload) {
      let newUser = {
        user_id: userState.userId,
        email: ticket.payload["email"],
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token,
      };
      // console.log(userState);
      const googleUser = await GoogleFitnessService.addUser(newUser);
      res.writeHead(301, { Location: userState.referer }).end();
    }
  } catch (err) {
    next(err);
  }
});

router.get(
  "/",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      userId = req.authData.user_id;
      const googleUser = await GoogleFitnessService.getUser(userId);
      res.send({
        connected: googleUser && googleUser.access_token ? true : false,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/disconnect",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      userId = req.authData.user_id;
      await GoogleFitnessService.removeUser(userId);
      return res.status(200).send({ message: "Google Fit Disconnected" });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/sync",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      userId = req.authData.user_id;
      googleUser = await GoogleFitnessService.getUser(userId);
      if (googleUser) {
        const data = await GoogleFitnessService.syncData(googleUser);
        res.send(data);
      } else {
        res.status(404).send({
          message: "No access to google fit provided",
        });
      }
    } catch (err) {
      // Use Express default error handler
      next(err);
    }
  }
);

router.get(
  "/data-types",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      userId = req.authData.user_id;
      googleUser = await GoogleFitnessService.getUser(userId);
      if (googleUser) {
        const data = await GoogleFitnessService.fetchDatatypes(userId);
        res.send({ datatypes: data });
      } else {
        res.status(404).send({
          message: "No access to google fit provided",
        });
      }
    } catch (err) {
      // Use Express default error handler
      next(err);
    }
  }
);

router.get(
  "/data",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      const { fromDate, toDate, dataTypes } = req.query;
      if (!testDateFormat(fromDate) || !testDateFormat(toDate)) {
        return res.status(400).json({
          error: "Please provide from Date and to Date (YYYY-MM-DD).",
        });
      }

      const dataTypesArray = dataTypes ? dataTypes.split(",") : [];
      userId = req.authData.user_id;
      let result = await GoogleFitnessService.fetchData(
        userId,
        fromDate,
        toDate,
        dataTypesArray
      );
      res.send(result);
    } catch (err) {
      // Use Express default error handler
      return next(err);
    }
  }
);

module.exports = router;
