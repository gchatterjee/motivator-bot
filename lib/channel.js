const channels = {}

const loadChannelsFromGuild = (guild, idList) =>
    idList.forEach(id => {
        const channel = guild.channels.get(id)
        if (channel) channels[id] = channel
    })

const getChannelById = (id, guild) =>
    channels[id] || (guild && loadChannelsFromGuild(guild, [id]))

module.exports = { loadChannelsFromGuild, getChannelById }
