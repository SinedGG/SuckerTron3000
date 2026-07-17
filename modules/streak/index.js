const schedule = require("node-schedule");

module.exports = (client) => {
  schedule.scheduleJob("0 */5 * * * *", () => {
    require("./give")(client);
  });

  schedule.scheduleJob("0 0 0 * * *", () => {
    require("./renew")(client);
  });

  schedule.scheduleJob("0 0 1 * * ", () => {
    const streak = require("@models/streak");
    streak.renew_freeze_days();
    console.log("[Streak] Freeze days renewed for all users");
  });
};
