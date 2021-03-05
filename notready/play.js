const Discord = require("discord.js");
//const ytdl = require(`ytdl-core`);
//const YouTube = require(`simple-youtube-api`);


exports.run = async (client, message, args) => {
	const youtube = new YouTube(client.config.googleApiKey);
	const settings = message.guild ?
		client.settings.get(message.guild.id) :
		client.config.defaultSettings;
	if (!args[0]) {
		if (client.servers[message.guild.id]) {
				if (client.servers[message.guild.id].playing == true && client.servers[message.guild.id].queue && message.guild.voiceConnection) {
				client.voiceConnections.get(message.guild.id).dispatcher.resume();
				client.servers[message.guild.id].playing == true;
				return message.channel.send(`Song Resumed :arrow_forward:`);
			} else {
				return message.channel.send('Please provide a song name or a youtube link!');
			}
		} else {
			return message.channel.send('Please provide a song name or a youtube link!');
		}
	}
	if (!message.member.voiceChannel) {
		return message.channel.send('You need to be in a voice channel');
	}

	if (!client.servers[message.guild.id]) {
		client.servers[message.guild.id] = {
			queue: []
		}
	}

	var server = client.servers[message.guild.id];
	const url = args[0];
	const searchString = args.join(' ');
	var video, videos;
	if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await youtube.getPlaylist(url);
		const videos = await playlist.getVideos();
		let list = [];
		for (const video of Object.values(videos)) {
			const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
			list.append(await client.handleVideo(video2, message, args, true)); // eslint-disable-line no-await-in-loop
		}
		client.send(message.channel, `In Queue:`, list);
	} else {
		try {
			await youtube.getVideo(url).then(res => {
				video = res;
				console.log('Got the video');
			});
		} catch (error) {
			console.log('Didnt get the video, search for it');
			try {
				await youtube.searchVideos(searchString, 1).then(res => {
					videos = res;
				}).catch(console.error);
				await youtube.getVideoByID(videos[0].id).then(res => {
					video = res;
				}).catch(console.error);
				console.log('Got search results');
			} catch (err) {
				console.log('No results gotten');
				console.error(e);
				return message.reply(`No results!`);
			}
		}
		return client.handleVideo(video, message, args);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`play`, `song`, `playsong`, `music`, `pl`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `play`,
	category: `Music`,
	description: `Plays a song / resumes a song`,
	extendedDescription: `Plays the song in a voice channel, or resumes if paused`,
	usage: `play [youtube link or song name (do not enter when resuming)]`
};
