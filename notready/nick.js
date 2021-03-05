const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES'))
        return message.channel.send("Sorry, I do not have the required permissions!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.channel.send("Please mention a valid member of this server");
    
    let emojis = args.slice(1).join(" ");
    console.log(emojis)
    let keywords = ["rad","radiance","lumi","luminosity","prom","prominence","vega","altair","us","gb","hk","tw","de","fr"]
    let symbols = ["✨", "✨", "⚡️", "⚡️", "🪐", "🪐", "💫", "💫", "🇺🇸", "🇬🇧", "🇭🇰", "🇹🇼", "🇩🇪", "🇫🇷"]
    for(i=0;i<keywords.length;i++){
        emojis = emojis.replace(keywords[i],symbols[i])
    }
    console.log(emojis)
    if (!emojis) return message.channel.send("No rank provided!");

    let nick = member.displayName + emojis;

    if (nick.length > 32) return message.channel.send("Nickname is too long!");

    await member.setNickname(nick).then(() => {
        if (!modlog) {
            return message.channel.send("nickname changed");
        } else if (settings.modLogEnabled.toLowerCase() === `true`) {
            let embed = new Discord.RichEmbed()
                .setTitle('Nick')
                .setAuthor('Mod-log entry | Nickname change', message.author.avatarURL)
                .addField('Moderator:', `${message.author.tag}`, true)
                .addField('User:', `${member.tag}`, true)
                .addField(`Ranks:`, emojis, true)
                .setTimestamp()
                .setColor(0xff6961)
            modlog.send(embed);
        }
    }).catch(error => {
        //message.reply(`I couldn't ban because of : ${error}`);
        console.error(error)
        client.error(undefined, error, `Nickname Error`);
    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`nick`],
    permLevel: 3,
    secret: true
};

exports.help = {
    name: `nick`,
    category: `Moderation`,
    description: `Edit nickname`,
    extendedDescription: `Edits the nickname of the mentioned user to add specific emojis`,
    usage: `nick [!@user] [rad|lumi|vega|prom|uk|us|hk|tw|de|other..]`
};