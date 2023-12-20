var cron = require("node-cron");
const GoogleFitnessService = require("./FitnessService");

cron.schedule(
  "59 23 * * *",
  async () => {
    console.log("Daily task run");
    const allusers = await GoogleFitnessService.getAllGoogleUser();
    if (allusers.length) {
      allusers.forEach(async (user) => {
        const startFetch = await GoogleFitnessService.syncData(user);
      });
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);
