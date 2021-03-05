const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS'))
        return message.channel.send("Sorry, I do not have the required permissions!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.channel.send("Please mention a valid member of this server");
    if (!member.bannable)
        return message.channel.send("I cannot ban this user as they have equal or higher permissions than me");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.ban(reason).then(() => {
        if (!modlog) {
            return;
        } else if (settings.modLogEnabled.toLowerCase() === `true`) {
            let embed = new Discord.RichEmbed()
                .setTitle('Ban')
                .setAuthor('Mod-log entry | Ban', message.author.avatarURL)
                .addField('Moderator:', `${message.author.tag}`, true)
                .addField('User Banned:', `${member.tag}`, true)
                .addField(`Reason:`, reason, true)
                .setTimestamp()
                .setColor(0xff6961)
            modlog.send(embed);
        }
    }).catch(error => {
        //message.reply(`I couldn't ban because of : ${error}`);
        client.error(undefined, error, `Ban Error`);
    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`abolish`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `ban`,
    category: `Moderation`,
    description: `Bans mentioned user`,
    extendedDescription: `Bans the users mentioned with the given reason`,
    usage: `ban [!@user] [reason]`
};