module.exports = (client) => {
  const xp = require("@models/xp");
  const timeout = require("@models/timeouts");

  client.on("messageReactionAdd", async (messageReaction, user) => {
    if (user.bot) return;
    const { Timeouts } = await timeout.get(user.id);
    if (!Timeouts) return;
    Timeouts.reactionTimeout.setSeconds(
      Timeouts.reactionTimeout.getSeconds() + 10
    );
    if (Timeouts.reactionTimeout < new Date()) {
      await xp.add(user.id, user.tag, 1);
      await timeout.setReaction(user.id);
      console.log(`[XP] ${user.tag} got 1 XP from reaction added.`);
    }
  });
};
