const axios = require("axios");
const moment = require("moment");
const googleAuth = require("../config/google");
const GoogleUser = require("../models/GoogleUserModel");
const GoogleData = require("../models/GoogleDataModel");

class GoogleFitnessService {
  static async refreshToken(id) {
    let user = await GoogleUser.query().findById(id);
    const newTokens = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: googleAuth.clientId,
      client_secret: googleAuth.clientSecret,
      refresh_token: user.refresh_token,
      grant_type: "refresh_token",
    });
    if (newTokens && newTokens.data) {
      const thisUser = await user.$query().updateAndFetch({
        access_token: newTokens.data.access_token,
      });
      return thisUser;
    } else {
      return null;
    }
  }

  static async getUser(userId) {
    let user = await GoogleUser.query().findOne({ user_id: userId });
    return user;
  }

  static async addUser(user) {
    let oldUser = await GoogleUser.query().findOne({ user_id: user.user_id });
    if (oldUser) {
      let thisUser = await oldUser.$query().updateAndFetch({
        access_token: user.access_token,
        id_token: user.id_token,
        refresh_token: user.refresh_token,
      });
      return thisUser;
    } else {
      let newUser = await GoogleUser.query().insert(user);
      return newUser;
    }
  }

  static async removeUser(user_id) {
    let deleted = await GoogleUser.query().delete().where({ user_id });
    if (deleted) {
      return;
    } else {
      throw new Error("GOOGLE_USER_DELETION_ERROR");
    }
  }

  static async fetchData(userId, from, to, types) {
    let query = GoogleData.query()
      .select("id", "datatype", "data", "from_date", "to_date")
      .where({ userId: userId })
      .where("on_date", ">", new Date(from).getTime() / 1000)
      .where("on_date", "<=", new Date(from).getTime() / 1000);
    if (types && types.length) {
      query = query.whereIn("datatype", types);
    }
    query = query.orderBy("from_date");

    const result = await query;
    return result;
  }

  static async syncData(userId) {
    let googleUser = await this.getUser(userId);
    let today = moment().format("YYYY-MM-DD");
    let yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    let userData = await axios.post(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      {
        aggregateBy: googleAuth.dataTypes.map(({ dataTypeName }) => ({
          dataTypeName,
        })),
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: yesterday.getTime(),
        endTimeMillis: today.getTime(),
      },
      {
        headers: { Authorization: `Bearer ${googleUser.access_token}` },
      }
    );
    //Dataset Aggregate Issues
  }
}

module.exports = GoogleFitnessService;
