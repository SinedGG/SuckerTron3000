module.exports = (client) => {
  require("./voice")(client);
  require("./message")(client);
};
