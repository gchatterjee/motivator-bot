const channels = {}

function loadChannelsFromGuild(guild, idList) {
    for (const id of idList) {
        const channel = guild.channels.get(id)
        if (channel) {
            channels[id] = channel
        }
    }
}

function getChannelById(id, guild) {
    if (guild && !channels[id]) {
        loadChannelsFromGuild(guild, [id])
    }
    for (const channelId of Object.keys(channels)) {
        if (channelId === id) {
            return channels[channelId]
        }
    }
    return undefined
}

module.exports = {
    getChannelById,
    loadChannelsFromGuild
}
