const express = require('express');
const User = require('@carecentive/carecentive-core/models/User');
const UserService = require('@carecentive/carecentive-core/services/UserService');
const RoleService = require('@carecentive/carecentive-core/services/RoleService');

const router = express.Router();

const authentication = require('@carecentive/carecentive-core/source/Authentication')

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
