const Discord = require(`discord.js`);
//const ytdl = require(`ytdl-core`);
//const YouTube = require(`simple-youtube-api`);
const fs = require(`fs`);
var colors = require('colors');
//const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
// var usersFile = 

module.exports = client => {
  //const youtube = new YouTube(client.config.googleApiKey);
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  client.log = (type, msg, title, time = true) => {
    if (!title) title = `Log`;
    if (time) {
      console.log(`[${type.yellow}] [${title.blue}] ${msg}   [${Date().gray}]`);
    } else {
      console.log(`[${type.yellow}] [${title.blue}] ${msg}`);
    }
  };

  client.error = (type, err, title) => {
    if (!title) title = `Uncaught error:`;
    if (!type) type = `<UNDEFINED>`;
    console.log(Date().blue);
    console.error(`[${type.red}] ${title.magenta}`, err);
  }

//   client.awaitReply = async (msg, question, limit = 60000) => {
//     const filter = m => (m.author.id = msg.author.id);
//     await msg.channel.send(question);
//     try {
//       const collected = await msg.channel.awaitMessages(filter, {
//         max: 1,
//         time: limit,
//         errors: [`time`]
//       });
//       return collected.first().content;
//     } catch (e) {
//       return false;
//     }
//   };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == `Promise`) {
      text = await text;
    }
    if (typeof evaled !== `string`) {
      text = require(`util`).inspect(text, { depth: 0 });
    }

    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(
        client.token,
        `--snip--`
      );

    return text;
  };

  client.send = async (channel, title, content, color) => {
    let embed = new Discord.RichEmbed()
      .addField(title, content)
      .setColor(!color ? 0xff6961 : color)
      .setFooter(client.config.footer, client.user.avatarURL);
    channel.send(embed);
  };

//   client.play = async (connection, message, args) => {
//     var server = client.servers[message.guild.id];

//     client.send(message.channel, `Playing: ${server.queue[0].title} by ${server.queue[0].artist}!`, `<${server.queue[0].url}> \n ${server.queue[0].duration}`);
//     client.log(`Log`, `Playing: ${server.queue[0].title} by ${server.queue[0].artist} in guild ${message.guild.name}`, `EVNT`);
//     client.servers[message.guild.id].playing = true;
//     connection.playStream(ytdl(server.queue[0].url, {
//       filter: 'audioonly'
//     }));

//     server.queue.shift();

//     connection.dispatcher.on('end', () => {
//       if (server.queue[0]) {
//         client.log(`Log`, `Song Ended!`, `EVNT`);
//         client.play(connection, message, args);
//       } else {
//         client.log(`Log`, `Last Song Ended, disconnecting from ${message.guild.name}`, `EVNT`);
//         client.servers[message.guild.id].playing = false;
//         connection.disconnect();
//       }
//     });
//   }

//   client.handleVideo = async (video, message, args, playlist = false) => {
//     let server = client.servers[message.guild.id];
//     let song = {
//       id: video.raw.id,
//       title: video.raw.snippet.title,
//       artist: video.raw.snippet.channelTitle,
//       duration: `${video.duration.hours}h ${video.duration.minutes}m ${video.duration.seconds}s`,
//       url: `https://www.youtube.com/watch?v=${video.raw.id}`
//     }

//     if (message.guild.voiceConnection) {
//       server.queue.push(song);
//       if (playlist) {
//         returned = `${song.title} by ${song.artist}!, <${song.url}> \n ${song.duration}`;
//       } else {
//         message.channel.send('Song added to queue');
//         client.send(message.channel, `In Queue: ${song.title} by ${song.artist}!`, `<${song.url}> \n ${song.duration}`);
//       }
//       console.log(server.queue);
//     } else {
//       server.queue.push(song);
//       message.channel.send('Song playing :notes:');
//       console.log(server.queue);
//     }
//     if (!message.guild.voiceConnection) {
//       message.member.voiceChannel.join().then(function (connection) {
//         client.play(connection, message, args);
//       });
//     }
//     if (playlist) {
//       return returned;
//     }
//   }

  client.unmuteuser = async (uid) => {

  }

  client.blockMessage = function(message) {
    if (message.guild) {
      const settings = message.guild ?
      client.settings.get(message.guild.id) :
      client.config.defaultSettings;
      if (settings.blocked) {
        if (settings.blocked[message.channel.id]){
          if (settings.blocked[message.channel.id].length > 0) {
            let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
            for (i=0;i<Object.keys(settings.blocked); i++) {
              for (j=0;j<settings.blocked[message.channel.id].length;j++) {
                if (message.content.indexOf(settings.blocked[message.channel.id][j]) != -1) {
                  try {
                    message.delete()
                    client.log(`MOD LOG`, `Deleted message ${message.content} by ${message.author.tag} in server ${message.guild.name}, [${message.channel.id}]`, `Success!`)
                  } catch (error) {
                    client.error(`ModErr`, error, `Error deleting blocked message`)
                  }
                  
                  
                  if (!modlog) {
                    console.log(`No modlog`);
                  } else if (settings.modLogEnabled.toLowerCase() === `true`) {
                    let embed = new Discord.RichEmbed()
                      .setTitle('MessageBlock')
                      .setAuthor('Mod-log entry | Block', message.author.avatarURL)
                      .addField(`Author:`, message.author.tag)
                      .addField(`Message:`, message.content, true)
                      .setTimestamp()
                      .setColor(0xff6961)
                    modlog.send(embed);
                  }
                }
              }
              
            }
          }
        }
      }
    }
  }

  String.prototype.toProperCase = function() {
    return this.replace(
      /([^\W_]+[^\s-]*) */g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require(`util`).promisify(setTimeout);

  // process.on(`uncaughtException`, err => {
  //   console.log(Date().blue);
  //   const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`);
  //   console.error(`Uncaught Exception: `.red, errorMsg.yellow);
  //   process.exit(1);
  // });

  process.on(`unhandledRejection`, err => {
    console.log(Date().blue);
    console.error(`Uncaught Promise Error: `.red, err);
  });

  process.on(`unhandledError`, err => {
    console.log(Date().blue);
    console.error(`Uncaught Error: `.red, err.yellow);
  });

//   process.on(`error`, err => {
//     console.log(Date().blue);
//     console.error(`Uncaught Error: `.red, err.yellow);
//   });

  client.on("error", (err) => {
    console.log(Date().blue);
    console.error(`Uncaught Client Error: `.red, err);
  });
  client.on("warn", (err) => {
    console.log(Date().blue);
    console.warn(`Client Warning: `.magenta, err.yellow);
  });

  client.on(`ready`, () => {
    client.setInterval(() => {
      for (let i in client.mutes) {
        let time = client.mutes[i].period;
        let guildId = client.mutes[i].guild;
        let guild = client.guilds.get(guildId);
        let channel = guild.channels.get(client.mutes[i].channel);
        let member = guild.members.get(i);
        let role = guild.roles.find(r => r.name === `muted`);
        if (!role) continue;

        if (Date.now() > time) {
          member.removeRole(role);
          delete client.mutes[i];
          fs.writeFile(`./data/mutes.json`, JSON.stringify(client.mutes), err => {
            if (err) {
              return client.error(`mute writeFile err`, err, `Error writing to mutes file`);
            }
            channel.send(`<@${member.user.id}> has been unmuted!`);
            client.log(`Unmute`, `${member.user.tag} has been unmuted in ${guild.name}!`, `User Unmute`);
          }); 
        }
      }
    }, 5000);
  });
  // client.on("debug", (err) => {
  //   console.log(Date().blue);
  //   console.info(`Debug: `.cyan, err.yellow);
  // });

  Map.prototype.filter = function(f) {
    ar =[]
    this.forEach(a => f(a) ? ar.push(a) : {}); 
    return ar
  }
};
