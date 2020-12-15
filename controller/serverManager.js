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
                })
                .catch(console.error)
            }
        }
    }
}