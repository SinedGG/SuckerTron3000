module.exports = (client) => {
  const xp = require("@models/xp");
  const timeout = require("@models/timeouts");
  const cfg = require("@config/xp");

  client.on("messageReactionAdd", async (messageReaction, user) => {
    if (user.bot) return;
    const { Timeouts } = await timeout.get(user.id);
    if (!Timeouts) return;
    Timeouts.reaction_timeout.setSeconds(
      Timeouts.reaction_timeout.getSeconds() + cfg.timeouts.reaction
    );
    if (Timeouts.reaction_timeout < new Date()) {
      await xp.add(user.id, user.tag, cfg.points.reaction);
      await timeout.setReaction(user.id);
      console.log(
        `[XP] ${user.tag} got ${cfg.points.reaction} XP from reaction added.`
      );
    }
  });
};
