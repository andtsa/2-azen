const Discord = require("discord.js");
//const ytdl = require(`ytdl-core`);
//const YouTube = require(`simple-youtube-api`);

exports.run = async (client, message, args) => {
	const youtube = new YouTube(client.config.googleApiKey);
	if (client.servers[message.guild.id].playing == false || !client.servers[message.guild.id].queue) {
		return message.channel.send('There is no song playing');
	}
	if (!message.member.voiceChannel) {
		return message.channel.send('You need to be in a voice channel');
	}
	
	client.voiceConnections.get(message.guild.id).dispatcher.pause();
	client.servers[message.guild.id].playing == false;
	return message.channel.send(`Song Paused :pause_button:`);

}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: [`ps`],
	permLevel: 0,
	secret: true
};

exports.help = {
	name: `pause`,
	category: `Music`,
	description: `Pauses the song`,
	extendedDescription: `Pauses the currently playing song`,
	usage: `pause`
};