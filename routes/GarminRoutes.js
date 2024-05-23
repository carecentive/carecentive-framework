const express = require('express');
const router = express.Router();
const { getActivities, getAllDataAllUsersTimeless, getDailySummaries } = require('@carecentive/carecentive-core/services/GarminServices');

// Define routes for fetching Garmin data
router.get('/getDailySummaries', async (req, res) => {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    const uploadEndTimeInSeconds = Math.round(Date.now()/1000);
    const uploadStartTimeInSeconds = uploadEndTimeInSeconds - 40000;
    await getActivities(userID, uploadStartTimeInSeconds, uploadEndTimeInSeconds);
    await getDailySummaries(userID, uploadStartTimeInSeconds, uploadEndTimeInSeconds);
    res.status(200).json();
  } catch (error) {
    console.error('Error fetching daily summaries:', error.message);
    res.status(500).json({ error: 'Error fetching daily summaries' });
  }
});

router.get('/getAllSummaries', async (req, res) => {
  try {
    const summaries = await getAllDataAllUsersTimeless();
    res.status(200).json(summaries);
  } catch (error) {
    console.error('Error fetching all summaries:', error.message);
    res.status(500).json({ error: 'Error fetching all summaries' });
  }
});

module.exports = router;
