const Discord = require(`discord.js`);

exports.run = async (client, message, args) => { 
	const settings = client.settings.get(message.guild.id);

	console.log(settings);

	if (!args[0]) {
		await client.send(message.channel, `Error!`, `Please specify a key to edit...`);
		return;
	}
	if (args[0].length < 1) {
		await client.send(message.channel, `Error!`, `Please specify a new value!`);
		return;
	}
	let prefix;
	if (args.length > 1) {
		if (args[0] == `"` && args[args.length-1] == `"`) {
			prefix = args.slice
		}
	}
	settings['prefix'] = args[0];

	client.settings.set(message.guild.id, settings);

	client.send(message.channel, `Success!`, `The prefix has been edited successfully to \`${args[0]}\``);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`pref`, `setprefix`, `newprefix`, `editprefix`],
	permLevel: 2,
	secret: false
};

exports.help = {
	name: `prefix`,
	category: `System`,
	description: `Bot prefix for this server`,
	extendedDescription: `Set the bot prefix for the server. Requires moderator permissions`,
	usage: `prefix [new prefix]`
};
