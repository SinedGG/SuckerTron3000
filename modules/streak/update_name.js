module.exports = async(client,member_id, sufix ) =>{
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  try {
      member = await guild.members.fetch(member_id);
    } catch (err) {
      console.warn(
        `[Role] Cannot fetch member ${member_id}:`,
        err.message || err
      );
      return;
    }
  let name = member.displayName
  if (name.includes(' | ')) {
    name = name.split(' | ')[0]; 
  }
  name+=sufix
  member.setNickname(name).catch(console.log);
  console.log(`[Name update] ${member.user.tag} nickname changed`);
}
