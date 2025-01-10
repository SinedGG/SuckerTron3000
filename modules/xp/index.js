module.exports = (client) => {
  const cfg = require("@config/xp");

  require("./message")(client);
  require("./reaction")(client);
  // require("./voice")(client);

  require("./give_role")(client);

  setInterval(() => {
    // require("./voice")(client);
  }, cfg.checkTimeouts.voice);

  setInterval(() => {
    require("./give_role")(client);
  }, cfg.checkTimeouts.voice);
};
