module.exports = (client) => {
  const xp = require("@models/xp");
  const cfg = require("@config/xp");

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
          await xp.add(member.id, member.user.tag, cfg.points.voiceMuted);
          console.log(
            `[XP] ${member.user.tag} is muted + ${cfg.points.voiceMuted} xp`
          );
        } else {
          await xp.add(member.id, member.user.tag, cfg.points.voice);
          console.log(
            `[XP] ${member.user.tag} is not muted + ${cfg.points.voice} xp`
          );
        }
      });
    }
  });
};
