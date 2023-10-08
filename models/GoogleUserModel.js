const { Model } = require("objection");

const User = require("@carecentive/carecentive-core/models/User");

// TODO: Improve example, add description

class GoogleUserModel extends Model {
  static get tableName() {
    return "google_user";
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "google_user.user_id",
        to: "user.id",
      },
    },
  };
}

module.exports = GoogleUserModel;
