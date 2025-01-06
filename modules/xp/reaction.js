module.exports = (client) => {
  const xp = require("@models/xp");

  client.on("messageReactionAdd", async (messageReaction, user) => {
    if (user.bot) return;
    const date = await xp.getReactionTimeout(user.id);
    if (!date) return;
    date.reactionTimeout.setSeconds(date.reactionTimeout.getSeconds() + 10);
    if (date.reactionTimeout < new Date()) {
      await xp.add(user.id, 1);
      await xp.setReactionTimeout(user.id, new Date());
      console.log(`[XP] ${user.tag} got 1 XP from reaction added.`);
    }
  });
};
