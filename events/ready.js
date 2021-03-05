let fs = require("fs");
const moment = require(`moment`);
require(`moment-duration-format`);
module.exports = async(client) => {
    await client.wait(1000);

    client.log(
        `Starting..`,
        `Ready to serve ${client.users.size} users in ${
      client.guilds.size
    } servers.`,
        `Ready!`
    );
	
   // client.users.find(u => u.id == "281387075608248320").send("Back online");
   // client.users.find(u => u.id == "281387075608248320").createDM().then( (ch) => ch.send("back online"));

    client.user.setPresence({ activity: { name: '[v3.9.1 beta] a!help for help' }, status: 'online' })

    await fs.readFile(`./data/settings.json`, (err,data) => {
        const settingsData = JSON.parse(data)
        if (err) {
            client.error(`readFile`, err, `Error reading settings file`)
        }
        for (let s in settingsData) {
            client.settings.set(s, settingsData[s])
            console.log(client.settings.get(s))
        }
    });

    //console.log(client.guilds)
    client.guilds
        .filter(g => !client.settings.has(g.id))
        .forEach(g => client.settings.set(g.id, client.config.defaultSettings));

    client.guilds
        .filter(g => !client.tags.has(g.id))
        .forEach(g => client.tags.set(g.id, {}));

    // let serverssettings = []
    // client.guilds.forEach(s => !client.settings.has(g.id) ? serverssettings.push(s))
    // serverssettings.forEach(g => client.settings.set(g.id, client.config.defaultSettings));

    // client.guilds
    //     .filter(g => !client.tags.has(g.id))
    //     .forEach(g => client.tags.set(g.id, {}));

    // let tg = []
    // tg.forEach(s => )

    // await client.wait(15000);
    // for (i = 8; i = 7; i++) {
    //     // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    //     client.user.setPresence({
    //         game: {
    //             name: `[IN DEV] a!help for help`,
                
    //             type: 0
    //         }
    //     });
    //     await client.wait(20000);
    //     // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    //     client.user.setPresence({
    //         game: {
    //             name: `[IN DEV] | on ${((client.guilds.size) * 9)} servers`,
                
    //             type: 0
    //         }
    //     });
    //     await client.wait(3500);
    //     // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    //     client.user.setPresence({
    //         game: {
    //             name: `with ${((client.users.size) * 21)} users`,
                
    //             type: 0
    //         }
    //     });
    //     await client.wait(4000);
    //     // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    //     client.user.setPresence({
    //         game: {
    //             name: `the world crumble to pieces`,
    //             type: "WATCHING"
    //         }
    //     });
    //     await client.wait(12000);
    //     client.user.setPresence({
    //         game: {
    //             name: ` For a!help for help`,
    //             type: "WATCHING"
    //         }
    //     });
    //     await client.wait(4000);
    //     // client.log(`Save`,`Saving client data to file...`);
    //     // //console.log(client)
    //     // let data = [client]
    //     // fs.writeFile(`./data/client.json`, JSON.parse(data), err => {
    //     //     if (err) {
    //     //         return client.error(`Client FileWrite`, err, `Error writing to client save file:`);
    //     //     }
    //     // });
    // }
};
