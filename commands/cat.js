const Discord = require(`discord.js`);
const { get } = require("snekfetch"); 
exports.run = async (client, message, args) => {
	let msg = await message.channel.send(`Meow...`);
    try {
        await get(`http://aws.random.cat/meow`).then((result) => {
            let embed = new Discord.RichEmbed()
                .setTitle('Cat')
                .setImage(result.body.file)
                .setColor(0xff6961)
                .setFooter(`${client.config.footer}`, client.user.avatarURL);
            msg.delete();
            return message.channel.send(embed);
        }).catch((err) => {
            console.error(err);
        });
    } catch (e) {
        msg.edit(`Failed!`);
        return console.error(e);
    }
	msg.edit(`Failed!`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`cats`, `c`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `cat`,
	category: `Fun`,
	description: `Sends a cat pic`,
	extendedDescription: `Send a random cat picture`,
	usage: `cat`
};
