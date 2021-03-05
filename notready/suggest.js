const Discord = require(`discord.js`);


exports.run = async (client, message, args) => {
      const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

      let sgChannel = message.guild.channels.find(channel => channel.name === settings.suggestionChannel);

      if (!sgChannel) return message.channel.send("There is no suggestions chanel specified")
      message.react("👌")
      suggestion = args.join(" ")

      const embed = new Discord.RichEmbed()
        .addField(`Suggestion:`, `${suggestion}`)
        .setColor(0xff6961)
        .setFooter(`by ${message.member.displayName}`, message.author.avatarURL);

      sgChannel.send(embed).then(msg => {
        msg.react(`👍`)
        msg.react(`👎`)
      });
      
      await client.wait(1500)
      try {
        message.delete()
      } catch (error) {
        client.error(error)
      }
      
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [`suggestion`],
permLevel: 0,
secret: true
};

exports.help = {
name: `suggest`,
category: `Radiance Exclusive`,
description: `Add your suggestion`,
extendedDescription: `Adds the suggestion from your message to the suggestion channel`,
usage: `suggest [suggestion]`
};
