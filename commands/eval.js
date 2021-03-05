const hastebin = require(`hastebin-gen`);
const Discord = require(`discord.js`);


exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const Discord = require(`discord.js`);

  const code = args.join(` `);
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    if (clean.length > 1024) {
      hastebin(clean, `txt`)
        .then(link => {
          const embed = new Discord.RichEmbed()
            .addField(`:inbox_tray: Input:`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`:outbox_tray: Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
            .setFooter(client.config.footer, client.user.avatarURL)
            .setColor(0xff6961);
          message.channel.send({ embed });
        })
        .catch(console.error);
      return;
    }
    const embed = new Discord.RichEmbed()
      .addField(`:inbox_tray: Input:`, `\`\`\`js\n${code}\n\`\`\``)
      .addField(`:outbox_tray: Output:`, `\`\`\`js\n${clean}\n\`\`\``)
      .setFooter(client.config.footer, client.user.avatarURL)
      .setColor(0xff6961);
    await message.channel.send({ embed });
  } catch (err) {
    const errClean = await client.clean(client, err);
    if (errClean.length > 1024) {
      hastebin(errClean, `txt`)
        .then(link => {
          const embed = new Discord.RichEmbed()
            .addField(`:inbox_tray: Input:`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`:outbox_tray: Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
            .setFooter(`${client.config.footer}`, client.user.avatarURL)
            .setColor(0xff6961);
          message.channel.send({ embed });
        })
        .catch(console.error);
      return;
    }
    const embed = new Discord.RichEmbed()
      .setTitle('Eval')
      .setAuthor(client.user.username, client.user.avatarURL)
      .addField(`:inbox_tray: Input:`, `\`\`\`js\n${code}\n\`\`\``)
      .addField(`:outbox_tray: Error!`, `\`\`\`xl\n${errClean}\n\`\`\``)
      .setFooter(`${client.config.footer}`, client.user.avatarURL);
    await message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 11,
  secret: false
};

exports.help = {
  name: `eval`,
  category: `System`,
  description: `Evaluates javascript.`,
  extendedDescription: `I evaluate any arbitrary javascript you give me and I give you the output!`,
  usage: `eval [code]`
};
