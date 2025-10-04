const schedule = require("node-schedule");

module.exports = (client) => {
  schedule.scheduleJob("0 */5 * * * *", () => {
    require("./give")(client);
  });

  schedule.scheduleJob("0 0 0 * * *", () => {
    require("./renew")(client);
  });
};
