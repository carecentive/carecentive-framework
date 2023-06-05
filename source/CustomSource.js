/**
 * This file contains various helper function. Add your own functions, or create a separate file in the source folder.
 */

/**
 * Takes a JS-Date and returns the respective UNIX-Timestamp
 * @param {date} date 
 * @returns {int} UNIX-Timestamp
 */
function dateToTimestamp (date) {
    return Math.round(date/1000);
}

/**
 * Get the datetime of the latest submitted questionnaire for all questionnaire IDs in the database
 * @param {*} allQuestionnaires A list of all questionnaires, in time-ascending order for one single user
 * @returns {Object} Key-value Object, keys are questionnaire IDs, values are the last datetime this questionnaire was submitted 
 */
function getLatestSubmissionByQuestionnaire (allQuestionnaires) {
    let latest = {};
    for (let questionnaire of allQuestionnaires) {
        latest[questionnaire.questionnaire] = questionnaire.datetime;
    }
    return latest;
}

/**
 * Returns a random integer between min and max.
 * @param {int} min 
 * @param {int} max 
 * @returns {int} Random int
 */
function getRandomIntegerBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

module.exports = {dateToTimestamp, getLatestSubmissionByQuestionnaire,  getRandomIntegerBetween}