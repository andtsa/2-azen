const Discord = require("discord.js");
//const ytdl = require(`ytdl-core`);
//const YouTube = require(`simple-youtube-api`);

exports.run = async (client, message, args) => {
	const youtube = new YouTube(client.config.googleApiKey);
	if (client.servers[message.guild.id].playing == false || !client.servers[message.guild.id].queue) {
		return message.channel.send(`There is no song playing`);
	}
	if (!message.member.voiceChannel) {
		return message.channel.send(`You need to be in a voice channel`);
	}
	if (!args[0]) {
		return message.channel.send(`Volume currently is set to **${(client.voiceConnections.get(message.guild.id).dispatcher.volume)*100}%**`);
	}
	client.voiceConnections.get(message.guild.id).dispatcher.setVolumeLogarithmic((args[0]*5) / 5);
	return message.channel.send(`Volume set to **${args[0] * 100}%**`);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`vol`],
	permLevel: 0,
	secret: true
};

exports.help = {
	name: `volume`,
	category: `Music`,
	description: `Sets the song volume`,
	extendedDescription: `Changes the volume of the song currently playing`,
	usage: `volume [number?]`
};
