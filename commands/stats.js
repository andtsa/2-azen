const Discord = require(`discord.js`);
const { version } = require(`discord.js`);
const moment = require(`moment`);
require(`moment-duration-format`);

exports.run = async (client, message) => { 
	const duration = moment.duration(client.uptime).format(` D [days], H [hrs], m [mins], s [secs]`);
	const msg = await message.channel.send(`Getting stats...`);
	const embed = new Discord.RichEmbed()
		.setAuthor(`Stats for Azen`, client.user.avatarUrl)
		.setDescription(`Here are a few stats:`)
		.addField(`Mem Usage:`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
		.addField(`Uptime:`, `${duration}`, true)
		.addField(`Ping:`, `${msg.createdTimestamp - message.createdTimestamp}ms. API: ${Math.round(client.ping)}ms`, true)
		.addField(`Users:`, ((client.users.size)).toLocaleString(), true)
		.addField(`Channels:`, client.channels.size.toLocaleString(), true)
		.addField(`Servers:`, ((client.guilds.size)).toLocaleString(), true)
		.addField(`Discord.js:`, version, true)
		.addField(`Node.js:`, process.version, true)
		.addField(`Azen:`, `v2.1.1 beta`, true)
		.addField(`Creator:`, `Andreas#2166`, true)
		.setFooter(`${client.config.footer} ${msg.createdTimestamp - message.createdTimestamp}ms.`, client.user.avatarUrl)
		.setColor(0xff6961);
	msg.delete();
	message.channel.send( embed );
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`sts`, `sst`, `stast`, `s`],
	permLevel: 0,
	secret: false
};
 
exports.help = {
	name: `stats`,
	category: `Miscelaneous`,
	description: `Bot stats`,
	extendedDescription: `Gives some usefull stats about the bot`,
	usage: `stats`
};
