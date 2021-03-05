const Discord = require(`discord.js`);
const {
    inspect
} = require(`util`);
const fs = require(`fs`)

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);

    console.log(settings);

    if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("Sorry, I do not have the required permissions to manage/delete messages! I need the **manage messages** perm on one of my roles");

    if (!settings.blocked) settings.blocked = {}
    if (!settings.blocked[message.guild.id]) settings.blocked[message.guild.id] = [];

    if (!args) {
        return message.channel.send(inspect(settings.blocked), {
            code: `json`
        });
    }

    console.log(settings)
    console.log(settings.blocked)
    console.log(settings.blocked[message.guild.id])

    console.log(settings.bloked[message.guild.id].push(args.join(` `)));

    client.settings.set(message.guild.id, settings);

    fs.readFile(`./data/settings.json`, (err, data) => {
        let json = JSON.parse(data)
        if (err) {
            client.error(`readFile`, err, `Error reading settings file`)
            console.log(json)
        }

        json[message.guild.id] = (client.settings.get(message.guild.id))

        fs.writeFile(`./data/settings.json`, JSON.stringify(json), err => {
            if (err) {
                return client.error(`Settings FileWrite`, `Error ` + err, `Error writing to server settings save file:`);
            }
        });
    });

    return client.send(message.channel, `Success!`, `Messages containing \`${args.join(" ")}\` will now be blocked in this server`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`autoblock`, `block`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `block`,
    category: `Moderation`,
    description: `Block messages`,
    extendedDescription: `Blocks all messages containing the string (letters/words) you pass as an argument`,
    usage: `block [string]`
};
