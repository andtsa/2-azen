const Discord = require(`discord.js`);

exports.run = async (client, message, args) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let deletePerms = message.guild.member(client.user).hasPermission('MANAGE_MESSAGES');
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);

    if (!deletePerms) return client.send(message.channel, `Error!`, `I don't have the permission to do that!`);
    if (!modlog && settings.modLogEnabled.toLowerCase() === `true`) {
        client.send(message.channel, `Warning!`, `No mod-log channel named ${settings.modLogChannel} was found! do ${settings.prefix}set edit modLogChannel [channel name] to set it!`)
    };

    message.guild.channels.find(channel => channel.id === message.channel.id).clone()
        .then(clone => {
            clone.setParent(message.channel.parentID);
            message.channel.delete();
            clone.send(`Success! All messages have been deleted!`).then(msg => {
                msg.delete(7000);
            });
            if (!modlog) {
                return;
            } else if (settings.modLogEnabled.toLowerCase() === `true`) {
                let embed = new Discord.RichEmbed()
                    .setTitle('Clear')
                    .setAuthor('Mod-log entry | Channel Purge', message.author.avatarURL)
                    .addField('Admin:', `${message.author.tag}`, true)
                    .addField('Channel Purged:', `${message.channel.name}`, true)
                    .setTimestamp()
                    .setColor(0xff6961)
                modlog.send(embed);
            }
        });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`da`,`delA`,`deleteAll`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `deleteAll`,
    category: `Moderation`,
    description: `Deletes every message in the channel`,
    extendedDescription: `Deletes every message ever sent in the channel it's used in`,
    usage: `deleteAll`
};
