module.exports = (client) => {
  const xp = require("@models/xp");
  const timeout = require("@models/timeouts");
  const cfg = require("@config/xp");

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const data = await timeout.get(message.author.id);

    if (!data || !data.Timeouts) {
      await xp.add(message.author.id, message.author.tag, cfg.points.message);
      await timeout.setMessage(message.author.id);

      console.log(
        `[XP] ${message.author.tag} got ${cfg.points.message} XP (first message).`,
      );
      return;
    }

    const { Timeouts } = data;

    if (Timeouts.message_timeout <= new Date()) {
      await xp.add(message.author.id, message.author.tag, cfg.points.message);
      await timeout.setMessage(message.author.id);

      console.log(`[XP] ${message.author.tag} got ${cfg.points.message} XP.`);
    }
  });
};
