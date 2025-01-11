module.exports = (number) => {
  const cfg = require("@config/xp");

  for (let i = 0; i < cfg.roles.id.length - 1; i++) {
    if (number >= cfg.roles.score[i] && number <= cfg.roles.score[i + 1]) {
      return cfg.roles.id[i];
    }
  }
  return undefined;
};
