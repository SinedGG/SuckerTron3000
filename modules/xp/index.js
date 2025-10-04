const schedule = require("node-schedule");

module.exports = (client) => {
  const cfg = require("@config/xp");

  require("./message")(client);
  require("./reaction")(client);

 
  schedule.scheduleJob("0 1 * * * *", () => {
    require("./voice")(client);
  });


  schedule.scheduleJob("0 10 * * * *", () => {
    require("./give_role")(client);
  });

 
};
