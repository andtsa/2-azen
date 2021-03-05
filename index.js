if (process.version.slice(1).split(`.`)[0] < 8)
    throw new Error(`Node 8.0.0 or higher is required.`);

const Discord = require(`discord.js`);
const { promisify } = require(`util`);
const readdir = promisify(require(`fs`).readdir);
const Enmap = require(`enmap`);
//const ytdl = require(`ytdl-core`);
//const YouTube = require(`simple-youtube-api`);
const client = new Discord.Client();
client.mutes = require(`./data/mutes.json`);
client.config = require(`./config.js`);
console.log(client.config);
//const youtube = new YouTube(client.config.googleApiKey);
const util = require('util');
require(`./util/functions.js`)(client);

client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({ name: `settings`, persistent: true });
client.tags = new Enmap({ name: `tags`, persistent: true });

client.servers = {};

const init = async() => {
    const cmdFiles = await readdir(`./commands/`);
    client.log(`Log`, `Loading ${cmdFiles.length} commands.`, `Files`, false);
    cmdFiles.forEach(f => {
        try {
            const props = require(`./commands/${f}`);
            if (f.split(`.`).slice(-1)[0] !== `js`) return;
            client.log(`Load`, `Loading Command: ${props.help.name}`, `Log`, false);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        } catch (e) {
            client.log(`Log`, `Unable to load command ${f}: ${e.stack}`, `Error`, false);
        }
    });

    const evtFiles = await readdir(`./events/`);
    client.log(`Log`, `Loading all ${evtFiles.length} events.`, `Log`, false);
    evtFiles.forEach(file => {
        const eventName = file.split(`.`)[0];
        const event = require(`./events/${file}`);

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init();