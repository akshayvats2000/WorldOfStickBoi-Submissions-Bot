const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

const serverManager = require('./controller/serverManager');
const messageManager = require('./controller/messageManager');

client.once('ready', () => {
    console.log('Bot is Up');
});

client.on('message', message => {
    messageManager.linkDetector(message);
    messageManager.videoDetector(message);
});

client.on('guildMemberAdd', member => serverManager.newMember(member));

client.on('guildMemberRemove', member => serverManager.removeMember(member));

client.login(token);