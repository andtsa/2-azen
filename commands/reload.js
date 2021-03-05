const Discord = require(`discord.js`);

exports.run = async (client, message, args) => {
    if (!args || args.size < 1) return message.channel.send(`<@${message.author.id}> Must provide a command to reload.`);

    let command;
    if (client.commands.has(args[0])) {
        command = client.commands.get(args[0]);
    } else if (client.aliases.has(args[0])) {
        command = client.commands.get(client.aliases.get(args[0]));
    }
    if (!command) {
        return client.send(message.channel, `Error!`, `The command \`${args[0]}\` doesn't seem to exist!`);
    }
    command = command.help.name;

    delete require.cache[require.resolve(`./${command}.js`)];
    const cmd = require(`./${command}`);
    client.commands.delete(command);
    client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
    });
    client.send(message.channel, `Success!`, `The command [${command}] has been reloaded`);
    client.log(`Rld`, `The command [${command}] has been reloaded`, `Reload!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 8,
    secret: false
};

exports.help = {
    name: `reload`,
    category: `System`,
    description: `Reloads a command without bot restart.`,
    extendedDescription: `Reload a command so that you dont have to restart the bot`,
    usage: `reload [command]`
};
