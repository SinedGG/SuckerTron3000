module.exports = (client) => {
  const xp = require("@models/xp");
  const timeout = require("@models/timeouts");

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const { Timeouts } = await timeout.get(message.author.id);
    if (!Timeouts) return;

    Timeouts.messageTimeout.setSeconds(
      Timeouts.messageTimeout.getSeconds() + 10
    );
    if (Timeouts.messageTimeout < new Date()) {
      await xp.add(message.author.id, message.author.tag, 1);
      await timeout.setMessage(message.author.id);
      console.log(`[XP] ${message.author.tag} got 1 XP from message sent.`);
    }
  });
};
