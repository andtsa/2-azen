const Discord = require("discord.js");

exports.run = async (client, message) => {
	if (client.servers[message.guild.id].playing == false || !client.servers[message.guild.id].queue) {
		return message.channel.send('There is no song playing');
	}
	if (!message.member.voiceChannel) {
		return message.channel.send('You need to be in a voice channel');
	}

	let queue = client.servers[message.guild.id].queue;
	console.log(queue);
	let output = ``;
	let i = 1;
	queue.forEach(song => {
		output += `${i}) ${song.artist.toUpperCase()} :\n  ${song.title} \n \n`;
		i++;
	});
	
	return client.send(message.channel, `Song Queue`, `\`\`\`ruby\n ${output}\`\`\``);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`q`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `queue`,
	category: `Music`,
	description: `Displays the queue`,
	extendedDescription: `Shows the song queue as well as the currently playing song`,
	usage: `queue`
};
