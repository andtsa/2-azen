module.exports = (client, guild) => {
    client.tags.delete(guild.id, {});
    client.settings.delete(guild.id);
};
