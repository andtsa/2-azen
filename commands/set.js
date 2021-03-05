const Discord = require(`discord.js`);
const { inspect } = require(`util`);
const fs = require(`fs`);
//const { settings } = require("cluster");

exports.run = async (client, message, [key, ...value], level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);

    console.log(settings);
 
    if (!key) {
        return message.channel.send(inspect(settings), {
            code: `json`
        });
    }
    if (!settings[key] && key != `unblock`) {
        return client.send(message.channel, `Error!`, `That key does not exist!`);
    }

    if (!value) {
        if (!settings[key]) {
            client.send(message.channel, `Error!`, `This key does not exist in the settings`)
        }
        return message.reply(`The value of ${key} is currently \`${settings[key]}\``);
    }
    
    let failed = false
    let failText = ``
    if (key == `blocked`){
        if (!settings[key][value[0]]) { 
            settings[key][value[0]] = []
        }
        if(!settings[key][value[0]].includes((value.slice(1)).join(` `))) {
            settings[key][value[0]].push((value.slice(1)).join(` `))
        }
    } else if (key == `unblock`) {
        key = `blocked`
        if (!settings[key][value[0]]) { failed = true; failText = `That channel doesn't have any blocked strings!` }
        else if(!settings[key][value[0]].includes((value.slice(1)).join(` `))) { failed = true; failText = `That string isn't blocked!` }
        else {
            let index = settings[key][value[0]].indexOf((value.slice(1)).join(` `))
            if (index == -1) { failed = true; failText = `That string isn't blocked!` }
            else {
                settings[key][value[0]].splice(index,1)
                console.log(settings[key])
            }
        }
    } else {
        settings[key] = value.join(` `);
    }
    

    

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
                return client.error(`Settings FileWrite`, `Error `+err, `Error writing to server settings save file:`);
            }
        });
    });

    if (failed) {
        return client.send(message.channel, `Error!`, `Failed to edit settings: ${failText}`)
    }

    return client.send(message.channel, `Success!`, `\`${key}\` successfully edited to \`${value.join(` `)}\``);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`setting`, `settings`, `conf`, `edit`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `set`,
    category: `System`,
    description: `Settings for this server`,
    extendedDescription: `Set the bot settings for the server. Requires admin permissions. For messageBlocking, do a!set [blocked/unblock] [ChannelID to block in] [string to block]`,
    usage: `set [key] [value]`
};
