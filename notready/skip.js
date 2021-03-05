const Discord = require("discord.js");
//const ytdl = require(`ytdl-core`);

exports.run = async (client, message) => {
	if (!message.member.voiceChannel) {
		return message.channel.send('You need to be in a voice channel');
	}

	var server = client.servers[message.guild.id];

	if (message.guild.voiceConnection) {
		console.log('There is a voice connection');
		if (client.voiceConnections.get(message.guild.id).dispatcher) {
			console.log('There is a dispatcher');
			client.voiceConnections.get(message.guild.id).dispatcher.end();
			return message.channel.send('Song skipped :fast_forward:');
		}
		console.log('No dispatcher');
	} else {
		console.log('No song');
		return message.channel.send('There is no song playing');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`skipsong`, `next`, `nextsong`, `playnext`, `sk`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `skip`,
	category: `Music`,
	description: `Skips a song`,
	extendedDescription: `Skips the currently playing song`,
	usage: `skip`
};
