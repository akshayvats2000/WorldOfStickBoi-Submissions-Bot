module.exports.newMember = function (member) {
    for (const roles of member.guild.roles.cache) {
        for (const role of roles) {
            if (role.name == '@everyone') {
                const name = member.user.username;
                member.guild.channels.create(name,{
                    type: 'text'
                })
                .then(channel => {
                    channel.overwritePermissions([
                        {
                            id: member.user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: role.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ])
                    member.guild.roles.create({
                        data: {
                            name: member.user.username
                        }
                    })
                    .then(role => {
                        member.roles.add(role)
                    })
                })
                .catch(console.error)
            }
        }
    }
}

module.exports.removeMember = function (member) {
    for (const channels of member.guild.channels.cache) {
        for (const channel of channels) {
            if (typeof(channel.name) == 'string' && channel.name == member.user.username.toLowerCase()) {
                channel.delete()
                .then(() => {
                    for (const roles of member.roles.cache) {
                        for (const role of roles) {
                            if (typeof(role.name) == 'string' && role.name == member.user.username) {
                                role.delete()
                            }
                        }
                    }
                })
            }
        }
    }
}