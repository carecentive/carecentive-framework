const express = require('express');
const ActivityService = require('../services/ActivityService');
const router = express.Router();

const authentication = require('@carecentive/carecentive-core/source/Authentication')

/* Get currently available activities for user */
router.get('/', authentication.authenticateToken, async function(req, res, next) {
  try {
    userId = req.authData.user_id;
    let userActivities = await ActivityService.getActivitiesForUser(userId);
    return res.json(userActivities);
  }
  catch(err) {
    // Use Express default error handler
    return next(err)
  }
});

module.exports = router;
