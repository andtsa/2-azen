const config = {
  owners: [`281387075608248320`],

  testers: [],
//          giallar                arcanum magna        yorgos
  admins: [`366921098077667338`, `463807930886520843`, `398372467099566080`],

  //            nnnn1111
  developers: [`505881183629082634`],
//            trufflebottom        dot six               mokington            tezzar
  support: [`487436633210355732`, `245333866716463105`, `89864785230860288`, `366660648626814976`],

  verified: [``],

  donators: [],


  token: ``,
  googleApiKey: ``,

  footer:`why am i doing this..`,

  defaultSettings: {
    prefix: `a!`,
    modLogChannel: `log`,
    modLogEnabled: `false`,
    modRole: `Mod`,
    adminRole: `Admin`,
    inviteBlock: `false`,
    welcomeChannel: `welcome`,
    welcomeMessage: `Please welcome {{mention}}, everyone!`,
    welcomeEnabled: `false`,
    announcementChannel: `announcements`
  },

  permLevels: [{
      level: 0,
      name: `User`,
      check: () => true
    },
    {
      level: 1,
      name: `Donator`,
      check: message => config.donators.includes(message.author.id)
    },
    {
      level: 2,
      name: `Moderator`,
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 3,
      name: `Administrator`,
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
            r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          return adminRole && message.member.roles.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: `Server Owner`,
      check: message => {
        if (message.channel.type === `text`){
          message.guild.owner.user.id === message.author.id 
        } else {
          return false
        }
      }
    },

    {
      level: 5,
      name: `Verified User`,
      check: message => config.verified.includes(message.author.id)
    },

    {
      level: 7,
      name: `Bot Support`,
      check: message => config.support.includes(message.author.id)
    },

    {
      level: 8,
      name: `Developer`,
      check: message => config.developers.includes(message.author.id)
    },

    {
      level: 9,
      name: `Bot Admin`,
      check: message => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: `Beta Tester`,
      check: message => config.testers.includes(message.author.id)
    },

    {
      level: 11,
      name: `Bot Owner`,
      check: message => config.owners.includes(message.author.id)
    }
  ]
};

module.exports = config;