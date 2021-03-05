const Discord = require(`discord.js`);
module.exports = (client, message) => {

  if (message.author.bot) return;
  
  const settings = message.guild ?
    client.settings.get(message.guild.id) :
    client.config.defaultSettings;

  console.log(client.settings)

  message.settings = settings;
  if (settings.inviteBlock == true && message.content.indexOf("discord.gg") !== -1 && message.channel.type != "dm") {
    message.delete();
    client.log(
      `Block`,
      `${client.config.permLevels.find(l => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) posted an invite link`,
      "INV"
    );
  }

  const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g)
      .slice(1);
  const command = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g)[0]
    .toLowerCase();
  const level = client.permlevel(message);

  let cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (message.mentions.has(client.user) && cmd == null) {
    cmd =
      client.commands.get('help') ||
      client.commands.get(client.aliases.get('help'));
  }
  if (message.content.toLowerCase().indexOf(settings.prefix.toLowerCase()) !== 0 && !message.mentions.has(client.user)) return;
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(
      `This command is only for use in a guild/server.`
    );
  }

  if (level < cmd.conf.permLevel) {
    return message.author.send(
      `**[CMD]** You do not have permission to use this command. Your permission level is ${
        client.config.permLevels.find(l => l.level === level).name
      } (${level}). This command requires level ${
        client.config.permLevels.find(l => l.level === cmd.conf.permLevel).name
      } (${cmd.conf.permLevel})`
    );
  }
  client.log(
    `Log`,
    `${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`,
    "CMD"
  );
  cmd.run(client, message, args, level);
};
