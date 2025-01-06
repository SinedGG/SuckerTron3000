module.exports = (client) => {
  const xp = require("@models/xp");

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const date = await xp.getMsgTimeout(message.author.id);
    if (!date) return;
    date.messageTimeout.setSeconds(date.messageTimeout.getSeconds() + 10);
    if (date.messageTimeout < new Date()) {
      await xp.add(message.author.id, 1);
      await xp.setMsgTimeout(message.author.id, new Date());
      console.log(`[XP] ${message.author.tag} got 1 XP from message sent.`);
    }
  });
};
