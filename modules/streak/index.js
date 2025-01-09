module.exports = (client) => {
  require("./give")(client);
  setInterval(() => {
    require("./give")(client);
  }, 60000 * 5);

  const schedule = require("node-schedule");
  schedule.scheduleJob("0 0 0 * * *", function () {
    require("./renew")(client);
  });
};
