const Discord = require(`discord.js`);
const client = new Discord.Client();
client.config = require(`./config.js`);

client.on(`ready`, () => {
    console.log("discord client ready");
    client.user.setPresence({ activity: { name: 'with hosting, not actually working' }, status: 'idle' })
  .then(console.log)
  .catch(console.error);
});

client.login(client.config.token)