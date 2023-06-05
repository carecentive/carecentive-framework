const express = require('express');
const User = require('carecentive-core/models/User');
const UserService = require('carecentive-core/services/UserService');
const RoleService = require('carecentive-core/services/RoleService');

const router = express.Router();

const authentication = require('carecentive-core/source/Authentication')

/* Sample route with Authentication */
router.get('/', authentication.authenticateToken, async function(req, res, next) {
  try {
    // TODO useful example
    userId = req.authData.user_id;
  }
  catch(err) {
    // Use Express default error handler
    return next(err)
  }
});

module.exports = router;
