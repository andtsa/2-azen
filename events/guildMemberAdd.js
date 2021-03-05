const Discord = require(`discord.js`);

module.exports = (client, member) => {
  const settings = client.settings.get(member.guild.id);

  if (settings.welcomeEnabled !== "true") return;

  const welcomeMessage = settings.welcomeMessage
    .replace(
        "{{mention}}",
        `<@${member.user.id}>`
    )
    .replace(
        "{{user}}", member.tag
    );

  var chnl = member.guild.channels.find("name", settings.welcomeChannel); // .catch(error => console.error(error));

  client.send(Discord, chnl, `Welcome!`, `${welcomeMessage}`); // .catch(error => console.error(error));
};
