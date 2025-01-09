module.exports = async(client,member_id, sufix ) =>{
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const member = await guild.members.fetch(member_id)
  let name = member.displayName
  if (name.includes(' | ')) {
    name = name.split(' | ')[0]; 
  }
  name+=sufix
  member.setNickname(name).catch(console.log);
  console.log(`${member.user.tag} nickname changed`);
}
