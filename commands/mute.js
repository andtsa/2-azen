const discord = require(`discord.js`);
const fs = require(`fs`);
const moment = require(`moment`);
require(`moment-duration-format`);

exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have the required permissions to mute someone! You still need *manage message* permissions`);

	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if (!toMute) return message.channel.send(`You didn't specify a user via mention or user id...`);

	let role = message.guild.roles.find(r => r.name === `muted`);
	if (!role) {
		try {
			role = await message.guild.createRole({
				name: `muted`,
				color: `#222222`,
				permissions: []
			});

			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch (err) {
			client.error(`Uncaught Muting Error`, `No Role!`, err.stack);
		}
	}

	if (toMute.roles.has(role.id)) return message.channel.send(`This user is already muted`);

	if (!Number.isInteger(parseInt(args[1]))) {
		message.channel.send(`Given muting time is not a number, defaulting to 5 minutes`);
		period = 300;
	} else {
		period = parseInt(args[1]);
	}

	client.mutes[toMute.id] = {
		guild: message.guild.id,
		channel: message.channel.id,
		period: Date.now() + period * 1000
	}

	await toMute.addRole(role);

	fs.writeFile(`./data/mutes.json`, JSON.stringify(client.mutes, null, 2), err => {
		if (err) {
			return client.error(`Mutes FileWrite`, err, `Error writing to mutes file:`);
		}
		const duration = moment.duration(period).format(` D [days], H [hrs], m [mins], s [secs]`);
		message.react(`👌`).catch(console.error);
	});

	
	client.log(`Mute`, `User ${toMute.user.tag} was muted in guild ${message.guild.name} by ${message.author.tag}!`, `User Muted!`);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`mut`, `moot`],
	permLevel: 2,
	secret: false
};

exports.help = {
	name: `mute`,
	category: `Moderation`,
	description: `Mutes a user for the given time in seconds`,
	extendedDescription: `Mutes the mentioned user for the given amount of time in seconds`,
	usage: `mute [user] [period (in seconds) (default is 5 mins)]`
};