const express = require("express");
const { clientId, clientSecret, redirectUri } = require("../config/google");

const User = require("@carecentive/carecentive-core/models/User");
const GoogleFitnessService = require("../services/GoogleFitnessService");
const router = express.Router();

const authentication = require("@carecentive/carecentive-core/source/Authentication");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

router.get(
  "/",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      userId = req.authData.user_id;
      const googleUser = await GoogleFitnessService.getUser(userId);
      console.log(googleUser);
      res.send({
        connected: googleUser && googleUser.access_token ? true : false,
      });
    } catch (err) {
      // Use Express default error handler
      return next(err);
    }
  }
);

router.post(
  "/connect",
  authentication.authenticateToken,
  async function (req, res, next) {
    const { access_token, refresh_token, id_token } = req.body;
    userId = req.authData.user_id;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: clientId,
    });
    try {
      if (ticket.payload) {
        let newUser = {
          user_id: userId,
          email: ticket.payload["email"],
          access_token,
          refresh_token,
          id_token,
        };
        const googleUser = await GoogleFitnessService.addUser(newUser);
        res.send({
          message: "Google Fit Connected",
          user: googleUser,
        });
      } else {
        res.status(400)({
          message: "Invalid User Tokens. Unable to verify Google User",
        });
      }
    } catch (err) {
      // Use Express default error handler
      return next(err);
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
      // Use Express default error handler
      return next(err);
    }
  }
);

router.get(
  "/sync",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      const { access_token, refresh_token } = req.body;
      userId = req.authData.user_id;
    } catch (err) {
      // Use Express default error handler
      return next(err);
    }
  }
);

router.get(
  "/data",
  authentication.authenticateToken,
  async function (req, res, next) {
    try {
      const { fromDate, toDate, dataTypes } = req.query;
      if (!fromDate || !toDate) {
        return res
          .status(400)
          .json({ error: "Please provide from Date and to Date." });
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
