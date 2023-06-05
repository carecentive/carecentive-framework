const { Model } = require('objection');

const User = require('./User');

// TODO: Improve example, add description

class CustomModel extends Model {
  static get tableName() {
    return 'user_photos';
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'user_photos.user_id',
        to: 'user.id'
      }
    }
  };

}

module.exports = Photo;