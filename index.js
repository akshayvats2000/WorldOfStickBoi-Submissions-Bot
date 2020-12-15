const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

const serverManager = require('./controller/serverManager');

client.once('ready', () => {
    console.log('Bot is Up');
});

// client.on('message', message => {
//     if (!message.author.bot) {
//         for (const attachments of message.attachments) {
//             for (const attachment of attachments) {
//                 if (attachment.url) {
//                     message.channel.send(attachment.url)
//                     .then(() => {
//                         message.delete();
//                     })
//                 }
//             }
//         }
//     }
// })

client.on('guildMemberAdd', member => serverManager.newMember(member));

client.login(token);