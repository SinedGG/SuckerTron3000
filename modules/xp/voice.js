module.exports = (client) => {
  const xp = require("@models/xp");

  const { ChannelType } = require("discord.js");

  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  const voiceChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildVoice
  );

  voiceChannels.forEach((voiceChannel) => {
    if (
      voiceChannel.members.size === 0 ||
      voiceChannel.id === guild.afkChannelId
    ) {
      return;
    }

    const activeUsers = [];

    voiceChannel.members.forEach((member) => {
      if (
        !member.user.bot &&
        !guild.voiceStates.cache.get(member.id).selfDeaf
      ) {
        activeUsers.push(member);
      }
    });

    if (activeUsers.length > 1) {
      activeUsers.forEach(async (member) => {
        const voiceState = guild.voiceStates.cache.get(member.id);
        if (voiceState.selfMute) {
          await xp.add(member.id, 1);
          console.log(`[XP] ${member.user.tag} is muted + 1 xp`);
        } else {
          await xp.add(member.id, 2);
          console.log(`[XP] ${member.user.tag} is not muted + 2 xp`);
        }
      });
    }
  });
};
