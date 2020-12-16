const Discord = require('discord.js');

module.exports.linkDetector = function (message) {
    if (!message.author.bot) {
        const urlDetectors = ['http','www','.com','.in','.ru','.org','.net','.ir','au','.uk','.de','.br']
        function channelFinder(name) {
            for (const channels of message.guild.channels.cache) {
                for (const channel of channels) {
                    if (typeof(channel.name) == 'string' && channel.name == name) {
                        return channel;
                    }
                }
            }
        }

        for (const tld of urlDetectors) {
            if (message.content.includes(tld)) {
                let logChannel = channelFinder('logs');
                let linkChannel = channelFinder('links');
                message.delete()
                .then(() => {
                    let linkEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Link Detected')
                    .setAuthor(message.author.username)
                    .setThumbnail(message.author.avatarURL())
                    .setDescription(`${message.author.username} just send a URL in text Channel`)
                    .setTimestamp()
                    .addField('Link',message.content,true)
                    .setFooter('Developed By Akshay Vats [:.]     ')
                    logChannel.send(linkEmbed);
                    linkChannel.send(linkEmbed);
                    message.channel.send("```Thanks For Submission```")
                })
                break;
            }
        }
    }
}

module.exports.videoDetector = function (message) {
    function channelFinder(name) {
        for (const channels of message.guild.channels.cache) {
            for (const channel of channels) {
                if (typeof(channel.name) == 'string' && channel.name == name) {
                    return channel;
                }
            }
        }
    }

    for (const atts of message.attachments) {
        for (const att of atts) {
            if (att.url) {
                let logChannel = channelFinder('logs');
                let VideoChannel = channelFinder('videos');
                logChannel.send(att.url)
                .then(() => {
                    VideoChannel.send(att.url)
                    .then(() => {
                        message.channel.send("```Thanks For Submission```")
                        setTimeout(() => {
                            message.delete()
                        },15000)
                    })
                })
            }
        }
    }
}