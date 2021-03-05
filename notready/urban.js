const discord = require("discord.js");
//const urban = require("urban");

exports.run = async (client, message, args) => {
	if (args.length < 1) {
		urban.random().first(function (json) {
			let embed = new discord.RichEmbed()
				.setAuthor(`Azen Urban CMD`, client.user.avatarURL)
				.setTitle(json.word)
				.setURL(json.permalink)
				.setColor(0xff6961)
				.setDescription(`**Definition:** \n ${json.definition || `None`}\n\n**Example:** \n${json.example || `None`}\n:thumbsup: ${json.thumbs_up || 0}  :thumbsdown: ${json.thumbs_down || 0}`)
				.setFooter(`${client.config.footer}`, client.user.avatarURL);
			return message.channel.send(embed);
		});
	} else {
		let str = args.join(" ");
		let res = urban(str);
		if (!res) return message.channel.send(`No results`);
		res.first(function (json) {
			let embed = new discord.RichEmbed()
				.setAuthor(`Azen Urban CMD`, client.user.avatarURL)
				.setTitle(json.word)
				.setURL(json.permalink)
				.setColor(0xff6961)
				.setDescription(`**Definition:** \n ${json.definition || `None`}\n\n**Example:** \n${json.example || `None`}\n:thumbsup: ${json.thumbs_up || 0}  :thumbsdown: ${json.thumbs_down || 0}`)
				.setFooter(`${client.config.footer}`, client.user.avatarURL);
			return message.channel.send(embed);
		});
	}
};

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: [`urb`, `ubarn`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `urban`,
	category: `Fun`,
	description: `Searches the Urban dictionary`,
	extendedDescription: `Search the Urban dictionary for a word or phrase`,
	usage: `urban [word/phrase (leave blank for random)]`
};