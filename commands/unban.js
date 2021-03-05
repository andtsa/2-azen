const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS'))
        return message.channel.send("Sorry, I do not have the required permissions!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.channel.send("Please input a valid user id");
    let displayName = member.tag;
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.unban(reason).then(() => {
        if (!modlog) {
            return;
        } else if (settings.modLogEnabled.toLowerCase() === `true`) {
            let embed = new Discord.RichEmbed()
                .setTitle('Unban')
                .setAuthor('Mod-log entry | Unban', message.author.avatarURL)
                .addField('Moderator:', `${message.author.tag}`, true)
                .addField('User Unbanned:', `${displayName}`, true)
                .addField(`Reason:`, reason, true)
                .setTimestamp()
                .setColor(0xff6961)
            modlog.send(embed);
        }
    }).catch(error => {
        //message.reply(`I couldn't ban because of : ${error}`);
        client.error(undefined, error, `Unban Error`);
    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`revive`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `unban`,
    category: `Moderation`,
    description: `Unbans mentioned user`,
    extendedDescription: `Unbans the users mentioned with the given reason`,
    usage: `unban [!User#tag] [reason]`
};

