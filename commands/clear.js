const Discord = require(`discord.js`);

exports.run = async (client, message, args) => { 
	const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
	let deletePerms = message.guild.member(client.user).hasPermission('MANAGE_MESSAGES');
	let amount = args[0];
	let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);

	if (!amount) return client.send(message.channel, `Syntax Error!`, `${settings.prefix}clear [amount]`);
	if (!deletePerms) return client.send(message.channel, `Error!`, `I don't have the permission to do that!`);
	if (!modlog && settings.modLogEnabled.toLowerCase() === `true`) {
		client.send(message.channel, `Warning!`, `No mod-log channel named ${settings.modLogChannel} was found! do ${settings.prefix}set edit modLogChannel [channel name] to set it!`)
	};
	if (isNaN(amount)) return client.send(message.channel, `Error!`, `Please enter a number!`);

	amount = parseInt(parseInt(amount) + 1);

	if (amount < 2 || amount > 100) return client.send(message.channel, `Error!`, `The amount of messages to be deleted has to bee inbetween 1 and 99!`);

	message.channel.fetchMessages({
		limit: amount
	}).then(deleteMsgs => {
		message.channel.bulkDelete(deleteMsgs)
		message.channel.send(`Success! ${parseInt(parseInt(amount) - 1)} messages have been deleted!`).then(msg => {
			msg.delete(2000);
		});
		if (!modlog) {
			return;
		} else if (settings.modLogEnabled.toLowerCase() === `true`) {
			let embed = new Discord.RichEmbed()
				.setTitle('Clear')
				.setAuthor('Mod-log entry | Purge', message.author.avatarURL)
				.addField('Moderator:', `${message.author.tag}`, true)
				.addField('Messages Deleted:', `${args[0]}`, true)
				.setTimestamp()
				.setColor(0xff6961)
			modlog.send(embed);
		}
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`del`, `delete`, `erase`, `remove`, `rmv`, `prg`, `purge`, `cl`],
	permLevel: 2,
	secret: false
};

exports.help = {
	name: `clear`,
	category: `Moderation`,
	description: `Deletes the given ammount of messages (note: messages older than 2 weeks cannot be deleted)`,
	extendedDescription: `I delete the given amount of messages and log it to the modlog channel`,
	usage: `clear [amount]`
};
