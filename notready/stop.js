const Discord = require("discord.js");
//const ytdl = require(`ytdl-core`);

exports.run = async (client, message, args) => {
	if (!message.member.voiceChannel) {
		return message.channel.send('You need to be in a voice channel');
	}

	if (message.guild.voiceConnection) {
		message.guild.voiceConnection.disconnect();
		client.servers[message.guild.id].queue = [];
		return message.channel.send('Stopped playing :octagonal_sign:');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`stop`, `stopplaying`, `end`, `bequiet`, `stap`, `stapp`, `stapit`, `stfu`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `stop`,
	category: `Music`,
	description: `Stops playing`,
	extendedDescription: `Stops the currently playing song`,
	usage: `stop`
};