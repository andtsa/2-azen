const discord = require(`discord.js`);
const fs = require(`fs`);

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have the required permissions to unmute! You still need *manage message* permissions`);

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send(`You didn't specify a user via mention or user id...`);

    let role = message.guild.roles.find(r => r.name === `muted`);

    if (!role || !toMute.roles.has(role.id)) return message.channel.send(`This user is not muted`);

    await toMute.removeRole(role.id);

    delete client.mutes[toMute.id];

    fs.writeFile(`./data/mutes.json`, JSON.stringify(client.mutes), err => {
        if (err) {
            return client.error(`mute writeFile err`, err, `Error writing to mutes file`);
        }
        message.react(`����`).catch(console.error);
        client.log(`Unmute`, `${toMute.user.tag} has been unmuted in ${message.guild.name}!`, `User Unmute`);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`unmut`, `unmoot`],
    permLevel: 2,
    secret: false
};

exports.help = {
    name: `unmute`,
    category: `Moderation`,
    description: `Unmutes a muted user`,
    extendedDescription: `Unmutes the mentioned user`,
    usage: `unmute [user]`
};