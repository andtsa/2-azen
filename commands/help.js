const Discord = require(`discord.js`);
exports.run = async (client, message, args, level) => {
  if (!args[0]) {
    const msg = await message.channel.send(`Getting help...`);
    const settings = message.guild // eslint-disable-line
      ? client.settings.get(message.guild.id)
      : client.config.defaultSettings;
    const myCommands = message.guild // eslint-disable-line
      ? client.commands.filter(
          cmd => cmd.conf.permLevel <= level &&
          cmd.conf.secret !== true
        )
      : client.commands.filter(
          cmd =>
            cmd.conf.permLevel <= level &&
            cmd.conf.guildOnly !== true 
        );
    const commandNames = myCommands.keyArray(); // eslint-disable-line
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0
    ); // eslint-disable-line
    let currentCategory = ``;
    let output = `> Use ${settings.prefix}help [command] for more details\n> Use ${settings.prefix}help setup for help setting up Azen (IMPORTANT!)\n`; // eslint-disable-line
    const sorted = myCommands
      .array()
      .sort(
        (p, c) =>
          p.help.category > c.help.category
            ? 1
            : p.help.name > c.help.name && p.help.category === c.help.category
              ? 1
              : -1
      ); //eslint-disable-line
    sorted.forEach(c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\n> ${cat}:\n`;
        currentCategory = cat;
      }
      output += `   ${settings.prefix}${c.help.name}${` `.repeat(
        longest - c.help.name.length
      )} : ${c.help.description}\n`;
    });
    const embed = new Discord.RichEmbed()
      .setAuthor(`Commands`, client.user.avatarURL)
      .setDescription(`\`\`\`ruby\n${output}\n\`\`\``)
      .setColor(0xff6961)
      .setFooter(
        `${client.config.footer} ${msg.createdTimestamp -
            message.createdTimestamp}ms.`,
            client.user.avatarURL
      );
    msg.delete();
    message.channel.send(embed);
  } else if (args[0] == `setup`) {
    const msg = await message.channel.send(`Getting help...`);
    const settings = message.guild // eslint-disable-line
      ? client.settings.get(message.guild.id)
      : client.config.defaultSettings;
    const embed = new Discord.RichEmbed()
      .setAuthor(`Azen Setup`, client.user.avatarURL)
      .setTitle(`Steps setting up Azen:`)
      .addField(`**1.** Set Moderator role:`, `Do \`${settings.prefix}set modRole [your moderator role name]\``)
      .addField(`**2.** Set Administrator role:`, `Do \`${settings.prefix}set adminRole [your administrator role name]\``)
      .addField(`**3.** Set Modlog channel:`, `The modlog channel will be the channel where all the moderation logs will be sent:\n Do \`${settings.prefix}set modLogChannel [your modlog channel name]\`\n and then do \`${settings.prefix}set modLogEnabled true\``)
      .setColor(0xff6961)
      .setFooter(`${client.config.footer} ${msg.createdTimestamp - message.createdTimestamp}ms.`, client.user.avatarURL);
    msg.delete();
    message.channel.send(embed);
  } else {
    const msg = await message.channel.send(`Getting help...`);
    const settings = message.guild // eslint-disable-line
      ? client.settings.get(message.guild.id)
      : client.config.defaultSettings;
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      const embed = new Discord.RichEmbed()
        .setAuthor(`Help | ${settings.prefix}${command.help.name}`, client.user.avatarURL)
        .addField(`Description:`, `${command.help.extendedDescription}`)
        .addField(`Usage:`, `\`\`\`${settings.prefix}${command.help.usage}\`\`\``)
        .setFooter(`${client.config.footer} ${msg.createdTimestamp - message.createdTimestamp}ms.`, client.user.avatarURL)
        .setColor(0xff6961);
      msg.delete();
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`h`, `halp`],
  permLevel: 0,
  secret: false
};

exports.help = {
  name: `help`,
  category: `System`,
  description: `Displays all the available commands.`,
  extendedDescription: `I dispaly all of the commands that you can access for your permission level!`,
  usage: `help [command]`
};



