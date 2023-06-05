const User = require('carecentive-core/models/User');
const Questionnaire = require('carecentive-core/models/Questionnaire')

class ActivityService {

  static async getActivitiesForUser(userId) {
    let user = await User.query().findById(userId)
  
    // Get all questionnaires of this user. Order by oldest first.
    let userQuestionnaires = await Questionnaire.query().select('id', 'datetime', 'questionnaire').where({
      user_id: userId
    }).orderBy('datetime', 'ASC')
  
    // Prepare the output array
    let userAvailableActivities = {activityState: "", activities: {}}

    userAvailableActivities.activities.sampleQuestionnaire = true;

    return userAvailableActivities;
  }
}

module.exports = ActivityService;