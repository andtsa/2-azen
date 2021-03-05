const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS'))
        return message.channel.send("Sorry, I do not have the required permissions!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.channel.send("Please mention a valid member of this server");
    if (!member.kickable)
        return message.channel.send("I cannot kick this user as they have equal or higher permissions than me");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.kick(reason).then(() => {
        if (!modlog) {
            return;
        } else if (settings.modLogEnabled.toLowerCase() === `true`) {
            let embed = new Discord.RichEmbed()
                .setTitle('Kick')
                .setAuthor('Mod-log entry | Kick', message.author.avatarURL)
                .addField('Moderator:', `${message.author.tag}`, true)
                .addField('User Kicked:', `${member.tag}`, true)
                .addField(`Reason:`, reason, true)
                .setTimestamp()
                .setColor(0xff6961)
            modlog.send(embed);
        }
    }).catch(error => {
        //message.reply(`I couldn't kick because of : ${error}`);
        client.error(undefined, error, `Kick Error`);
    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`kill`],
    permLevel: 2,
    secret: false
};

exports.help = {
    name: `kick`,
    category: `Moderation`,
    description: `Kicks mentioned user`,
    extendedDescription: `Kicks the users mentioned with the given reason`,
    usage: `kick [!@user] [reason]`
};