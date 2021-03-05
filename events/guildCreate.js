module.exports = (client, guild) => {
    client.settings.set(guild.id, client.config.defaultSettings);
    client.tags.set(guild.id, {});
};
