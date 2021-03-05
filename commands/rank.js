const Discord = require(`discord.js`);

exports.run = async (client, message, args,level) => {
  //let user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  //let userLevel = client.config.permLevels.find(l => l.level === client.permlevel(user.lastMessage)).level;
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  
  //let pronoun = user.id == message.member.id ? `Your` : `Their`;
  client.send(
    message.channel,
    `Permissions Level:`,
    `Your permission level is: ${level} - ${friendly}`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`rank`, `level`, `myrank`, `mylevel`, `rnk`],
  permLevel: 0,
  secret: false
};

exports.help = {
  name: `rank`,
  category: `Miscelaneous`,
  description: `Tells you your permission level`,
  extendedDescription: `Tells you your permission level for the current message location.`,
  usage: `rank`
};
