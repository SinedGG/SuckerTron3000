module.exports = (client) => {
  const xp = require("@models/xp");
  const timeout = require("@models/timeouts");
  const cfg = require("@config/xp");

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const { Timeouts } = await timeout.get(message.author.id);
    if (!Timeouts) return;

    Timeouts.messageTimeout.setSeconds(
      Timeouts.messageTimeout.getSeconds() + cfg.timeouts.message
    );
    if (Timeouts.messageTimeout < new Date()) {
      await xp.add(message.author.id, message.author.tag, cfg.points.message);
      await timeout.setMessage(message.author.id);
      console.log(
        `[XP] ${message.author.tag} got ${cfg.points.message} XP from message sent.`
      );
    }
  });
};
