const { Discord, Client } = require(`discord.js`);
const client = new Client();

exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send(`Generating Invite...`);
  client.generateInvite([
      `ADMINISTRATOR`,
      `CREATE_INSTANT_INVITE`,
      `KICK_MEMBERS`,
      `BAN_MEMBERS`,
      `MANAGE_CHANNELS`,
      `MANAGE_GUILD`,
      `ADD_REACTIONS`,
      `VIEW_AUDIT_LOG`,
      `VIEW_CHANNEL`,
      `READ_MESSAGES`,
      `SEND_MESSAGES`,
      `SEND_TTS_MESSAGES`,
      `MANAGE_MESSAGES`,
      `EMBED_LINKS`,
      `ATTACH_FILES`,
      `READ_MESSAGE_HISTORY`,
      `MENTION_EVERYONE`,
      `USE_EXTERNAL_EMOJIS`,
      `CONNECT`,
      `SPEAK`,
      `MUTE_MEMBERS`,
      `DEAFEN_MEMBERS`,
      `MOVE_MEMBERS`,
      `USE_VAD`,
      `CHANGE_NICKNAME`,
      `MANAGE_NICKNAMES`,
      `MANAGE_ROLES`,
      `MANAGE_WEBHOOKS`,
      `MANAGE_EMOJIS`
    ])
    .then(link => {
      msg.delete();
      client.send(message.channel, `Invite Link:`, `${link}`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`inv`, `add`, `invitation`],
  permLevel: 0,
  secret: false
};

exports.help = {
  name: `invite`,
  category: `Miscelaneous`,
  description: `Send Invite`,
  extendedDescription: `Sends an invite link for azen`,
  usage: `invite`
};
