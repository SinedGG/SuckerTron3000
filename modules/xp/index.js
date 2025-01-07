module.exports = (client) => {
  const cfg = require("@config/xp");

  require("./message")(client);
  require("./reaction")(client);
  require("./voice")(client);

  setInterval(() => {
    require("./voice")(client);
  }, cfg.checkTimeouts.voice);
};
