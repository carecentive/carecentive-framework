const { Model } = require("objection");

const User = require("@carecentive/carecentive-core/models/User");

// TODO: Improve example, add description

class GoogleData extends Model {
  static get tableName() {
    return "google_data";
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "google_data.user_id",
        to: "user.id",
      },
    },
  };
}

module.exports = GoogleData;
